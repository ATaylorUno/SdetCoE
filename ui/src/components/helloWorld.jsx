import { useState, useEffect } from 'react'

function HelloWorld() {
    const [text, setText] = useState("Hello World")

    useEffect(() => {
        console.log("Component loaded")

    }, [text])


    return (
        <>

            <p>
                text is {text}
            </p>
            <button onClick={() => setText("Hello Friday!")}>
                Make it Friday
        </button>

        </>
    )
}

export default HelloWorld