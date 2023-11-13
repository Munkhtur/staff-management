import { Context } from "@/pages/api/graphql";
import { compare, hash, } from "bcrypt";
import  {sign}  from 'jsonwebtoken';
import crypto from 'crypto'
var nodemailer = require("nodemailer");

const SECRET_KEY = 'erkmfsjkvnkrebserlkvsr'; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'munkhtur.siticom@gmail.com',
    pass: 'iqaq iinc fxkf jifp ',
  },
});
export const resolvers = {
    Query: {
      users:async (parent:any, args:any, context:Context) => {
          return await context.prisma.user.findMany()
      },
      user:async (parent:any, args:any, context:Context) => {
          return await context.prisma.user.findFirst({
            where: {
              id: args.id
            }
          })
      },
      adminUsers:async   (parent:any, args:any, context:Context) => {
        return await context.prisma.user.findMany({
            where: {
                role: "Admin"
            },
          
        })
    },
      staffUsers:async   (parent:any, args:any, context:Context) => {
        return await context.prisma.user.findMany({
            where: {
                role: "Staff" 
            }
        })
    },

    },
  
    Mutation: {
        login: async   (parent:any, args:any, context:Context) => {
            const user =  await context.prisma.user.findUnique({
                where: {
                    email: args.email,
                  
                }              
                
            })

            if (!user) {
            return user
              }
            
              const passwordMatch = await compare(args.password, user.password!);
            
              if (!passwordMatch) {
                return null;
              }
            
              const token = sign({ userId: user.id, email:user.email }, SECRET_KEY, { expiresIn: '1d' });
            
              // Return the token in the response
             
              return {token, user};
        },
      register: async (parent:any, args:any, context:Context) => {

        const hashedPassword = await hash(args.password, 10);
        const user = await context.prisma.user.create({
          data: {
            email:args.email,
            password: hashedPassword,
            role: args.role
          },
        });
      
        const token = sign({ userId: user.id, email:user.email }, SECRET_KEY, { expiresIn: '1d' });
      
        return { token, user };
      },
      upDateUser: async(parent:any, args:any, context:Context)=>{
        const { id, input } = args;
        return await context.prisma.user.update({
            where: {
                id: id
            },
            data: input
        })
      },
      deleteUser:async (_: any, args:any, context:Context) => {
        return await context.prisma.user.delete({
            where: {id: args.id},
        
        })
      },

      requestPasswordReset: async (_: any, args:any, context:Context)=> {
        const user = await context.prisma.user.findUnique({ where: { email:args.email } });
  
        if (!user) {
          throw new Error('User not found');
        }
  
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour
  
        await context.prisma.user.update({
          where: { email: args.email },
          data: {
            resetToken,
            resetTokenExpiry: new Date(resetTokenExpiry),
          },
        });
  
        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
  
        const mailOptions = {
          from: 'gmunkhtur@gmail.com',
          to: args.email,
          subject: 'Password Reset Request',
          text: `Click the link to reset your password: ${resetLink}`,
        };
  
        await transporter.sendMail(mailOptions);
  
        return true;
      },

       resetPassword : async (_:any, args:any, context:Context)=> {
        console.log(args,"args")
        const user = await context.prisma.user.findFirst({
          where: {
            resetToken: args.token,
            // resetTokenExpiry: {
            //   gte: new Date( Date.now() - 3600000),
            // },
          },
        });
        console.log(user, "user")
  
        if (!user) {
          throw new Error('Invalid or expired token');
        }
  
        const hashedPassword = await hash(args.newPassword, 10);
      
        await context.prisma.user.update({
          where: { id: user.id },
          data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        });
  
        return true;
    }
  }
  };

