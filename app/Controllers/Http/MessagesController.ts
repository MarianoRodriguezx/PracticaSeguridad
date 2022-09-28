import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Encryption from '@ioc:Adonis/Core/Encryption'
var nodemailer = require('nodemailer');

export default class MessagesController {
  public async index({}: HttpContextContract) {}

  //public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {

    try
    {
      var mensaje = Encryption.encrypt(request.input("message"));

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4f10c24bffcb74",
          pass: "1f4d498f305741"
        }
      })

      var mailOptions = {
        from: 'practica1@example.com',
        to: 'alejandro@mailtrap.com',
        subject: 'MensaAmigo',
        text: "Un amigo tuyo te envio un mensaje codificado entra en la pagina web para poder ver el mensaje, Mensaje: " + mensaje
      };

      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      })

      response.ok
      (
        {
          message: mensaje,
          status: true
        }
      )
    }
    catch(e)
    {
      response.badRequest(
        {
          message:"Ocurrio un error, lo siento :("
        }
      )
    }
    /* try{
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'alejordzhd@gmail.com',
          pass: 'DipperPines1.'
        }
      });

      var mensaje = "Hola desde nodejs...";

      var mailOptions = {
        from: 'alejordzhd@gmail.com',
        to: 'aleexrdzhd@gmail.com',
        subject: 'Prueba',
        text: mensaje
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      })
    }
    catch(e)
    {

    } */
  }

  public async desenrypt({ request, response }: HttpContextContract)
  {
    try
    {
      response.ok({
        message: Encryption.decrypt(request.input("message")),
        status: true
      })
    }
    catch(e)
    {
      response.badRequest(
        {
          message:"Ocurrio un error, lo siento :("
        }
      )
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
