import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function RecipeCard({name , image , link , time , missingIngredients, id, missedIngredientCount, usedIngredients}) {

    const router = useRouter()
    
    

    const toSlug = () => {
        if (typeof window === 'undefined') {
            return []; 
        }
        localStorage.setItem('missingIngredients', JSON.stringify(missingIngredients));
        localStorage.setItem('usedIngredients', JSON.stringify(usedIngredients));
        const formattedName = name.toLowerCase().replace(/ /g, '-');
        router.push(`/${formattedName}/${id}`);
    }

    const handleMissingIngredients = () => {
        if(missedIngredientCount == 0){
            return 'you have all the ingredients'
        }else{
            return `you need ${missedIngredientCount} more ingredients`
        }
    }
    const handleTime = () => {
        const numTime = Number(time);
    
        if (isNaN(numTime)) {
            console.error('Time is not a valid number:', time);
            return 'Invalid time';
        }
    
        if (numTime < 10) {
            return '< 10 mins';
        } else if (numTime >= 10 && numTime < 60) {
            return `${numTime} minutes`;
        } else {
            const hours = Math.floor(numTime / 60);
            const minutes = numTime % 60;
            
            return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`;
        }
    }
    return (
        <div onClick={toSlug} className='flex flex-col'>
          <div className='h-48 w-full relative'> {/* Set a fixed height for the image */}
            <Image
              layout='fill'
              objectFit='cover'
              src={image}
              alt={name}
              className='rounded-t-lg' // Round the top corners to match the card
            />
          </div>
          <div className='p-4'>
            <h2 className='text-lg font-semibold mb-1'>{name}</h2> {/* Title of the recipe */}
            <p className='text-sm text-gray-700'>{handleMissingIngredients()}</p> {/* Missing ingredients */}
            <div className='mt-2 text-sm'>{handleTime()}</div> {/* Cooking time */}
          </div>
        </div>
      );
}