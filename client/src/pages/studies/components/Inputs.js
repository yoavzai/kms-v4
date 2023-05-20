


export default function({inputs}) {

    return(
        <div>
            {inputs.map((input, index) => {
                return (
                    <div key={index}>
                        <span>{input.input_id} - {input.name}</span>
                    </div>
                )
            })}
        </div>
    )
}