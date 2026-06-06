import React,{useState,useMemo} from 'react'
import ProductCard from './ProductCard';
import SearchBox from './searchBox';
import Dropdown from './Dropdown';
const sortList=["Popularity","Price Low to High","Price High to Low"];
export default function ProductListings({products}) {
   
   const[searchText,setsearchText]=useState("");
   const[selectedSort,setSelectedSort]=useState("Popularity");
   const filteredAndSortedProducts=useMemo(()=>{
    if(!Array.isArray(products)){
      return [];
    }
    let filteredProducts=products.filter((product)=>(
        product.name.toLowerCase().includes(searchText.toLowerCase())||
        product.description.toLowerCase().includes(searchText.toLowerCase())
   ));
     return filteredProducts.slice().sort((a,b)=>{
       switch(selectedSort){
    case "Price Low to High": return parseFloat(a.price)-parseFloat(b.price);
     
     case "Price High to Low":
      return parseFloat(b.price)-parseFloat(a.price); 
     case "Popularity": 
     return parseInt(b.Popularity)-parseInt(a.Popularity);
    
   }
     })
   },[products,searchText,selectedSort])
   function handleSearchChange(inputSearch){
       setsearchText(inputSearch)
   }
   function handleSortChange(sortType){
       setSelectedSort(sortType)
   }
   /*let filteredAndSortedProducts=Array.isArray(products)?products.filter((product)=>(
        product.name.toLowerCase().includes(searchText.toLowerCase())||
        product.description.toLowerCase().includes(searchText.toLowerCase())
   )):[];*/
  /* switch(selectedSort){
    case "Price Low to High": filteredAndSortedProducts=filteredAndSortedProducts.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));
     break;
     case "Price High to Low":
      filteredAndSortedProducts=filteredAndSortedProducts.sort((a,b)=>parseFloat(b.price)-parseFloat(a.price)); break;
     case "Popularity": 
     filteredAndSortedProducts=filteredAndSortedProducts.sort((a,b)=>parseInt(b.Popularity)-parseInt(a.Popularity));
     break;
   }*/
  return (
    <div className="product-listings-container">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4 pt-5">
        <SearchBox label="Search" placeholder="Search products..." value={searchText} handleSearch={handleSearchChange}></SearchBox>
        <Dropdown label="Sort by" options={sortList} value={selectedSort} handleSort={handleSortChange}></Dropdown>
      </div>
        <div className="product-listings-grid">
              {
                filteredAndSortedProducts.length>0?(filteredAndSortedProducts.map((product)=>(
            <ProductCard key={product.productId} product={product}></ProductCard>
                ))):(
                    <p className="product-listings-empty">No product found</p>
                )
              }
        </div>
    </div>
  );
};
