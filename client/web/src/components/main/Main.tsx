import { useEffect, useState } from "react"
import Plants from "../plants/Plants"
import Add from "../add/Add"



// databaze
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    price: number;
  }

function Main(){

    // vypsani elemetu na stranku
    let plant: any = Plants.map((e) => {
        return (
            <li key={e.id}>{e.name}</li>
        )
    })


    // nastaveni title
    const [title, setTitle] = useState('nazev rostliny')

    // nastaveni lokace
    const [location, setLocation] = useState('lokace rostliny')

    const [image, setImage] = useState('')

    const [address, setaddress] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d166842.54249982783!2d16.41315059961617!3d49.202177199465815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712943ac03f5111%3A0x400af0f6614b1b0!2sBrno!5e0!3m2!1scs!2scz!4v1732833346881!5m2!1scs!2scz")

    const [airtempature, setAirtepature] = useState(0)
    const [pressure, setPressure] = useState(0)
    const [uts, setUnts] = useState(0)






    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<string | null>(null);
  

    // use effect
    useEffect(() => {


        // kod pro databazi

        axios
      .get('http://10.10.8.50/Kolik/Endpoint')  // URL API serveru
      .then(response => {
        setProducts(response.data);  // Nastavení získaných produktů do stavu
      })
      .catch(error => {
        setError('Chyba při načítání dat: ' + error.message); // Chyba při načítání dat
      });



        let ul = document.querySelector('ul') as HTMLUListElement
        let lists: any = ul.querySelectorAll('li')

        //graf
        const h = document.querySelector('#height') as HTMLDivElement
        const t = document.querySelector('#time') as HTMLDivElement



        // nastaveni title na obsah elementu
        for(let i of lists){
            i.addEventListener('click', () => {
                setTitle(i.textContent)
                Plants.forEach((e) => {
                    if(e.name === i.textContent){
                        setLocation(e.location)
                        setImage(e.image)
                        setaddress(e.point)
                        setAirtepature(e.tep)
                        setPressure(e.pre)
                        setUnts(e.uts)
                    }
                })     
            })
        }

    }, [])

    return (
        <main id="main" className="h-[100%] w-[100%] m-l-0 grid grid-rows-3 grid-cols-3">
            <h1 className="text-[50px] justify-self-center self-center text-[#d3d6d0]">{title}</h1>
            <div className="row-start-2 h-full w-full ml-5  overflow-y-auto border-[#d3d6d0] border-y-2">

                <ul>{plant}</ul>

            </div>

            <div className="row-start-2 col-start-3">
                <h5>nazev: {title}</h5>
                <p>vyskyt v přírodě: {location}</p>
                <p>teplota vzduch: {airtempature}°c</p>
                <p>tlak: {pressure}</p>
                <p>nadmořská výška: {uts}</p>
                <img className="h-[100px] w-[100px] rounded-full" src={image} alt="" />
                
            </div>

            <iframe className="col-end-4 w-full h-full" id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43390.11325485872!2d16.54465581197801!3d49.19027219836474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712943ac03f5111%3A0x400af0f6614b1b0!2sBrno!5e0!3m2!1scs!2scz!4v1732846859889!5m2!1scs!2scz"></iframe>

            <form id="form" className="row-start-3 ml-5"> 
                <input id="im" className="border-black border-l-2 border-b-2 my-3" type="text" placeholder="Zadejte nazev kvetiny"/>
                <input id="il" className="border-black border-l-2 border-b-2 my-3" type="text" placeholder="Zadejte vyskyt"/>
                <input id="te" className="border-black border-l-2 border-b-2 my-3" type="text" placeholder="Zadejte teplotu"/>
                <input id="tl" className="border-black border-l-2 border-b-2 my-3" type="text" placeholder="Zadejte tlak"/>
                <input id="vm" className="border-black border-l-2 border-b-2 my-3" type="text" placeholder="Zadejte vyska nad morem"/>
                <br />
                <button className="border-black border-2 w-[70px] rounded-md bg-[#f2f3f1]" onClick={() => Add()}>odeslat</button>
            </form>
        </main>
    )

}

export default Main

/*             {error && <p>{error}</p>}
            <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul> */