
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useState,useEffect } from "react";
import { useLoaderData,useLocation } from "react-router-dom";

export default function  Home(){
    const products=useLoaderData();
   
     return (
        <>
   
        <div className="home-container">
         <PageHeading title="Explore EasyStickers!">
            Add a touch of creativity to your space with our wide range of fun and unique stickers perfect for any occasion
         </PageHeading>
         <ProductListings products={products}></ProductListings>
        </div>
        </>
    );
}

export async function productsLoader(){
    try{
        
         const response= await apiClient.get("/products");
         return response.data;
      }catch(error){
          throw new Response(error.message||"Failed to Fetch the products,Please try again",{
            status:error.status||500
          });

      }
   }
