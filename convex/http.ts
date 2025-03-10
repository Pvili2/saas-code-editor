import {httpRouter } from "convex/server";
import {httpAction} from './_generated/server'
import {Webhook} from 'svix'
import {WebhookEvent} from '@clerk/nextjs/server'
import  {api} from './_generated/api'
const http = httpRouter();

http.route({
    path: '/clerk-webhook',
    method: 'POST',
    //ebben a handlerben egy clerk requesteket fogadunk
    handler: httpAction(async (ctx, request) =>{
        //ellenőrízzük, hogy van e erre env változónk
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        console.log(webhookSecret)
        if(!webhookSecret){
            throw new Error('Missing CLERK_WEBHOOK_SECRET env variable');
        }

        //megnézzük, hogy a kérés fejlécében vannak e ezek az identifikálók
        const svix_id = request.headers.get("svix-id") || request.headers.get("svix_id");
        const svix_signature = request.headers.get("svix-signature") || request.headers.get("svix_signature");
        const svix_timestamp = request.headers.get("svix-timestamp") || request.headers.get("svix_timestamp");
        if(!svix_id || !svix_signature || !svix_timestamp){
            return new Response('Error occurred -- no svix headers', {
                status: 400,
            })
        }
        //whsec_RpVA2ujBRj4YzuhItfghKKV6NM8emmrs
        //kinyerjük a request body-ját
        const body = await request.text(); // Ne használj JSON.stringify-t!


        //létrehozunk egy webhookot
        const wh = new Webhook(webhookSecret)
        let evt: WebhookEvent;

        //megpróbáljuk verifikálni a webhookot
        //Ha sikerül, tudjuk hogy a clerk küldte a webhookot
        // A webhook amit a clerken létrehoztunk és aminek a secretjét itt használjuk, a user.created esemén közben fogja ezt a webhookot elküleni a convexnek
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp
            }, ) as WebhookEvent
        } catch (err) {
            console.error("Error verifying webhook", err)
            return new Response(JSON.stringify({ error: {message: (err as Error).message, webhookS: webhookSecret, stack:(err as Error).stack}, ids: { svix_id, svix_signature, svix_timestamp } }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        //megnézzük, hogy milyen webhook eventről van szó
        const eventType = evt.type;
        if (eventType === "user.created") {
            //save the user to convex db
            //Kinyerjük a usernek azokat az infóit ami kell nekünk
            const {id, email_addresses, first_name, last_name, username} = evt.data
            const email = email_addresses[0].email_address
            const name =`${first_name || ""} ${last_name || ""} ${!first_name && !last_name ? username : ""}}`
            try {
                // A convexben is frissitjuk a users táblát a belépett felhasználóval
                await ctx.runMutation(api.users.syncUser, {
                    userId: id,
                    email,
                    name
                })

            } catch (error) {
                console.error("Error saving user to convex db", error)
                return new Response('Error occurred -- saving user to convex db', {status: 500})
            }
        }

        return new Response("Webhook processed successfully", {status: 200})
    })
})

export default http