import { Image } from '@mantine/core'
import React, { useState } from 'react'
import RaffleData from 'types/RaffleData'
function TemplateEditor() {
  const [preview, setPreview] = useState("")
  const testRaffle: RaffleData ={
  clientName: "Raul",
  date: "Martes 12 de Abril de 2021",
  prize: "Mercado",
  prizeValue: "200.000",
  lottery: "Loteria de la Caja",
  price: "200",
  number: "2",
  encerradoValue: "2000",
  line1Info: "Resp: FREDDY Calle 20 No. 12-76  CEL: 3157807292",
  line2Info: "PAGO DE PREMIOS DE LUNES A SÁBADO DE 4 P.M. A 6 P.M",
  line3Info: "Boleta rota o enmendada no se paga - caducidad 8 dìas.",
}
window.previewApi.generatePreview(testRaffle).then((data) => {
    setPreview("data:image/png;base64,"+data)
  })
  return (
    <div>
      <Image src={preview} width={500}/>
    </div>
  )
}

export default TemplateEditor
