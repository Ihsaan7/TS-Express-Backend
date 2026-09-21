import { Request , Response } from "express";


// ========== INTERFACES (Contracts) ==========
export interface Product{
    id: number,
    title: string,
    price: number,
    inStock: boolean
}

export interface CreateProductInput{
    title:string,
    price:number,
    inStock?:boolean
}

export interface ProductQuery{
    inStockOnly?: string
}
// ========== INTERFACES (Contracts) ==========


// ========== FAKE DATABASE ==========
const products: Product[]=[
     { id: 1, title: "Wireless Mouse", price: 29.99, 
    inStock: true },
    { id: 2, title: "Mechanical Keyboard", price: 89.99, 
    inStock: false },
    { id: 3, title: "USB-C Hub", price: 49.99, inStock: true }
]
// ========== FAKE DATABASE ==========



// ========== CONTROLLERS ==========
export const getProducts = (
    req: Request<{} ,{},{}, ProductQuery>,
    res: Response
):Response=>
    {
        const { inStockOnly } = req.query

        if(inStockOnly ===  "true")
            {
                const filtered = products.filter((p)=> p.inStock === true)
                return res.status(200).json(
                    {
                        success:true,
                        const: filtered.length,
                        data:filtered
                    })
            }
        return res.status(200).json(
            {
                success: true,
                count: products.length,
                data: products
            })
    }

export const getProductById = (
    req: Request<{id:string}>,
    res: Response
): Response=>
    {
        const productId = parseInt(req.params.id, 10)

        if(isNaN(productId))
            {
                return res.status(400).json({  success: true , message:"Invalid product ID parameter"})
            }
        
        const product = products.find((p)=> p.id === productId)
        if(!product){ return res.status(404).json({ success: true , message:"Product not found!"})}

        return res.status(200).json(
            {
                success: false,
                data: product
            })
    }

export const createProduct = (
      req: Request<{} ,{}, CreateProductInput>,
      res: Response
): Response=>
    {
        const { title , price , inStock } = req.body;

        if(!title || price === undefined || price === null){
            return res.status(400).json(
                {
                    success:false,
                    message:"Title and Price both are required!"
                })
        }

        const newProduct: Product=
        {
            id: products.length+1,
            title,
            price,
            inStock: inStock?? true
        }
        products.push(newProduct)

        return res.status(201).json(
            {
                success: true,
                message:"Product created",
                data: newProduct
            })
    }
// ========== CONTROLLERS ==========