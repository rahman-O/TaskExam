import React from 'react'
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRef } from "react";
import {getPersonyId} from "../store/personStore.js"
import {usePersonStore} from "../store/personStore.js"
function EdotTableData() {
    const {id} =useParams();
    const Username =useRef("");
    const FirstName =useRef("");
    const LastName =useRef("");
    const Email =useRef("");
    const Address =useRef("");
    const Specialization =useRef("");
    const ImageName =useRef("");
    const City =useRef("");
    const State =useRef("");
    const Zip =useRef("");
    const About =useRef("");
    const Contry =useRef("");

    const personToEdit =usePersonStore(getPersonyId(id));
    const updateApiCall=usePersonStore((state)=>state.updatePersonApi);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
       
        if (personToEdit) {
           
                Username.current.value=  personToEdit.UserName
                FirstName.current.value=  personToEdit.FirstName
                LastName.current.value= personToEdit.LastName
                Email.current.value  = personToEdit.Email
                Address.current.value = personToEdit.Address
                Specialization.current.value = personToEdit.Specialization
                
                City.current.value = personToEdit.City
            
                Zip.current.value = personToEdit.Zip
                State.current.value = personToEdit.State
                About.current.value =  personToEdit.About
                Contry.current.value = personToEdit. Contry
        }
      }, [navigate]);


      useEffect(() => {
        const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = '';
        };
    
        const handleUnload = () => {
          navigate('/add'); // Navigate to the "add" endpoint on page refresh
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('unload', handleUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
          window.removeEventListener('unload', handleUnload);
        };
      }, [navigate]);

      
     
          const updateHandler =async (e)=>{
           
            if(selectedImage===null ||selectedImage==""){
                    setSelectedImage(personToEdit.current.value);
            }
            let paylad ={
                UserName:Username.current.value,
                FirstName:FirstName.current.value,
                LastName:LastName.current.value,
                Email:Email.current.value,
                Address:Address.current.value,
                Specialization:Specialization.current.value,
               
                ImageName:selectedImage,
                City:City.current.value,
                id: Number(id),
                Zip:Zip.current.value,
                State:State.current.value,
                About:About.current.value,
                Contry:Contry.current.value,
            };
              e.preventDefault();
              if(paylad.UserName===""||
              
              paylad. FirstName===""||
              paylad.LastName===""||
              paylad. Email===""||
              paylad.Address===""||
              paylad.Specialization===""||
              paylad. ImageName===""||
              paylad. City===""||
              paylad. id===""||
              paylad. Zip===""||
              paylad.State===""||
              paylad. About===""||
              paylad. Contry===""){
                     alert("Fill in all fields")
              }
             
              await updateApiCall(paylad );
              navigate("/");
          }


          
        const handleFileUpload = (event) => {
            const file = event.target.files[0];
            setSelectedImage(file);
          };



  return (
    <div className=" mt-16 mb-8 flex items-center justify-center min-h-screen">
            <form  data-te-validation-init>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be careful what you share.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                        <input
                                            ref={Username}
                                            type="text"
                                            pattern="[0-9a-zA-Z ]{6,}"
                                            name="Username"
                                            id="Username"
                                            required
                                            autoComplete="Username"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                                            placeholder="janesmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        ref={About}
                                        id="About"
                                        name="About"
                                        
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                                       
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>





                            <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Device"
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
            <img
            src={"http://127.0.0.1:8000/images/"+personToEdit.ImageName}
            alt="Device"
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <input
            ref={ImageName}
          type="file"
          id="ImageName"
          name="ImageName"
          required
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
        <label
          htmlFor="ImageName"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
        >
          Change
        </label>
      </div>
    </div>


















                        </div>


                    </div>


                   







                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={FirstName}
                                        type="text"
                                        name="FirstName"
                                        id="FirstName"
                                        required
                                        autoComplete="given-name"
                                        className="  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={LastName}
                                        type="text"
                                        name="LastName"
                                        id="LastName"
                                        required
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={Email}
                                        id="Email"
                                        name="Email"
                                        type="email"
                                        autoComplete="Email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="Specialization" className="block text-sm font-medium leading-6 text-gray-900">
                                Specialization
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={Specialization}
                                        type="text"
                                        name="Specialization"
                                        id="Specialization"
                                        required
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                    ref={Contry}
                                        id="Country"
                                        name="Country"
                                        autoComplete="Country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={Address}
                                        type="text"
                                        name="Address"
                                        id="Address"
                                        required
                                        autoComplete="Address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={City}
                                        type="text"
                                        name="City"
                                        id="City"
                                        required
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={State}
                                        type="text"
                                        name="State"
                                        id="State"
                                        required
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                    ref={Zip}
                                        type="text"
                                        name="Zip"
                                        id="Zip"
                                        required
                                        autoComplete="Zip"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>

                <div className="mt-6 mb-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={updateHandler}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save

                    </button>
                </div>
            </form>

        </div>
  )
}

export default EdotTableData