import z from "zod"

 export  const signupInput = z.object({
    Name: z.string().max(30).optional() ,
    email: z.string().email() ,
    password : z.string().min(4).max(8)
})


 export  const signinInput = z.object({
    email: z.string().email() ,
    password : z.string().min(4).max(8)
})



export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})


export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})



export type updateBlogInput= z.infer<typeof updateBlogInput>
export type signupInput= z.infer<typeof signupInput>
export type createBlogInput= z.infer<typeof createBlogInput>
export type signinInput= z.infer<typeof signinInput>

