import path from 'path';
import fs from 'fs';
import hbs from 'handlebars';
import nodemailer,{ Transporter } from "nodemailer";
import emailTemplate from 'email-templates'
class SendEmail{
    private transporter:Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            secure:false,
            tls: {
                ciphers:'SSLv3'
             },         
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });
    }
    async send(assunto:string,to:string,from:string,name:string,hash:string,type:string){
        const source = path.join(__dirname,('..'),('views'),('email'),(`${type}.hbs`))
        const template = fs.readFileSync(source,'utf8');
        const compile = hbs.compile(template)
        const html = compile({
            name,
            hash,
        })
        

        const message = {
            from,
            to,
            subject:assunto,
            html
        }
        try{
            await this.transporter.verify();
            return await this.transporter.sendMail(message);
        
        }catch(e){
            console.log(e);
            return e;
        }
    }
}

export default new SendEmail();