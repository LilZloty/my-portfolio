import { useState, useEffect } from "react";

const AnimatedText = () => {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const textArray = [    'Since 2017', 'i design and develop',  'Shopify brands',    'who are really making sells.',    'I work with 6-7 figures brands,',    'the top 100 brands',    
  'on',   'Shopify - Shopify Plus and Wordpress.' ]
  
  useEffect(() => {
    let timeoutId
  
    const type = () => {
      setText(textArray[index].slice(0, text.length + 1))
      if (textArray[index].length > text.length + 1) {
        timeoutId = setTimeout(type, 50)
      } else {
        if (index === textArray.length - 1) {
          setTimeout(() => {
            setIndex(0)
            setText('')
          }, 1500)
          return
        }
        timeoutId = setTimeout(() => {
          setIndex((index + 1) % textArray.length)
          setText('')
        }, 1500)
      }
    }
    type()
  
    return () => {
      clearTimeout(timeoutId)
    }
  }, [textArray, index, text])
  
  
  return (
      <p className="text-[#6a92e3]">{text} </p>
  )
}

export default AnimatedText;
