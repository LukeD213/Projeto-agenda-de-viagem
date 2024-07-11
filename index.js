//bibliotecas e códigos de terceiros
const formatador = (data) => {
  return {
    dia: {
      numerico: dayjs(data).format('DD'),
      semana: {
        curto: dayjs(data).format('ddd'),
        longo: dayjs(data).format('dddd'),
      }
    },
    mes: dayjs(data).format('MMMM'),
    hora: dayjs(data).format('HH:mm')
  }
}


const atividade = {
  nome: "Almoço",
  data: new Date("2024-07-08 10:00"),
  finalizada: true
}

let atividades = [
  atividade,
  {
    nome: 'Academia em grupo',
    data: new Date("2024-07-09 12:00"),
    finalizada: false
  },
  {
    nome: 'Gamming session',
    data: new Date("2024-07-09 16:00"),
    finalizada: true
  },
]

//atividades = []

const criarItemDeAtividade = (atividade) => {

  let input = `<input 
  onchange="concluirA(event)"
  value="${atividade.data}"
  type="checkbox" `

  if(atividade.finalizada) {
    input += 'checked'
  }

  input += '>'

  const formatar = formatador(atividade.data);


  return `
  <div class="card-bg">
    ${input}
    <div>
      <svg class="active" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.50008 9.99999L9.16675 11.6667L12.5001 8.33332M18.3334 9.99999C18.3334 14.6024 14.6025 18.3333 10.0001 18.3333C5.39771 18.3333 1.66675 14.6024 1.66675 9.99999C1.66675 5.39762 5.39771 1.66666 10.0001 1.66666C14.6025 1.66666 18.3334 5.39762 18.3334 9.99999Z" stroke="#BEF264" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <svg class="inactive" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.41664 1.81833C9.46249 1.61593 10.5374 1.61593 11.5833 1.81833M11.5833 18.1817C10.5374 18.3841 9.46249 18.3841 8.41664 18.1817M14.6741 3.10083C15.5587 3.70019 16.3197 4.46406 16.9158 5.35083M1.8183 11.5833C1.6159 10.5375 1.6159 9.46252 1.8183 8.41667M16.8991 14.6742C16.2998 15.5587 15.5359 16.3198 14.6491 16.9158M18.1816 8.41667C18.384 9.46252 18.384 10.5375 18.1816 11.5833M3.1008 5.32583C3.70016 4.44128 4.46403 3.68023 5.3508 3.08417M5.3258 16.8992C4.44124 16.2998 3.6802 15.5359 3.08414 14.6492" stroke="#A1A1AA" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>


      <span>${atividade.nome}</span>
    </div>
    <time class="short">
      ${formatar.dia.semana.curto}
      ${formatar.dia.numerico} <br>
      ${formatar.hora}
    </time>
    <time class="full">
    ${formatar.dia.semana.longo}, 
    dia ${formatar.dia.numerico} 
    de ${formatar.mes} 
    às ${formatar.hora}h 
    </time>
  </div>`
  
}

const atualizarListaAtividades = () => {
  const section = document.querySelector('section')
  section.innerHTML=''

  if(atividades.length == 0) {
    section.innerHTML = '<p>Nenhuma atividade cadastrada.</p>'
    return
  }

  for(let atividade of atividades){
    section.innerHTML += criarItemDeAtividade(atividade)
  }

}

atualizarListaAtividades()

const S=(event)=>{
  event.preventDefault()
  const dadosDF = new FormData(event.target)
  const nome=dadosDF.get('atividade')
  const dia=dadosDF.get('dia')
  const hora=dadosDF.get('hora')
  const data=`${dia}${hora}`

  const novaAtividade = {
  nome,
  data,
  finalizada: false
  }

  const atividadeE=atividades.find((atividade)=>{
    return atividade.data==novaAtividade.data
  })

  if(atividadeE){
    return alert('Dia/Hora não disponivel')
  }

  atividades=[novaAtividade,...atividades]
  atualizarListaAtividades()
}

const criarDS=()=>{
  const dias=[
  "2024-02-28",
  "2024-02-29",
  "2024-03-01",
  "2024-03-02",
  "2024-03-03",
  ]
  let diasS=''

  for(let dia of dias){
    const formatar=formatador(dia)
    const diaF=`${formatar.dia.numerico} de
    ${formatar.mes}
    `
    diasS+=`
    <option value="${dia}">${diaF}</option>
    `
  }

  document.querySelector('select[name="dia"]').innerHTML=diasS
}
criarDS()

const cHS=()=>{
  let horasD=''

  for(let i=6;i<23;i++) {
    const hora=String(i).padStart(2, '0')
    horasD +=`<option value="${hora}:00">${hora}:00</option>`
    horasD +=`<option value="${hora}:30">${hora}:30</option>`
  }
  document.querySelector('select[name="hora"]').innerHTML=horasD
}
cHS()

const concluirA=(event)=>{
  const input=event.target
  const dataDI=input.value

  const atividade=atividades.find((atividade)=>{
    return atividade.data==dataDI
  })

  if(!atividade){
    return
  }

  atividade.finalizada=!atividade.finalizada
}