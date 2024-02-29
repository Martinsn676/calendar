import { tovobaColors } from "./tovobo.mjs"

const calendar = {
    addDays(){
        this.container = document.getElementById('mainContainer')
        this.container.innerHTML = this.daysTemplate()
        this.addFunctions()
    },
    daysTemplate(){
        let newHtml = ""
        for(let i = 0; i < 35; i ++ ){
            const  gottenItem = localStorage.getItem('day'+i)
            let save =JSON.parse(gottenItem)
            save = save ? save : []
            let elementsHtml = ""

            const numberSaves = save.length
            for(let j = 0; j <6; j++){
                if(j<numberSaves){
                    elementsHtml += `<div id="element${j}" class="dayElement"><div class="${save[j][1]}">${save[j][0]}</div></div>`
                }else{
                    elementsHtml += `<div id="element2" class="dayElement"></div>`
                }

            }
            
            newHtml+=`
                <div class="dayContainer flex-column align flex-spread ">
                    <span id="day${i}" class="dayNumber ">${i+1}</span>
                    <div class="container bordered flex-column">
                        ${elementsHtml}
                    </div>
                </div>
            `
        }
        return newHtml
    },
    addFunctions(){
    this.allContainers = document.querySelectorAll('.dayContainer ')

    this.allContainers.forEach((container, index) => {
        container.addEventListener('click', (event) => {
            modal.displayModal(index);
        });
    });
    }

}

calendar.addDays()

const modal = {
    'colors':[],
    'currentDay':"",
    setup(){
        this.colors = tovobaColors
        this.container = document.getElementById('modal')
        this.container.innerHTML=`
            <div id="modalBackground"></div>
            <div id="modalDisplay" class="flex-row">
                <div id="leftModal" class="flex-column w-6">
                    <div id="dayPreview" class="flex-column align flex-spread bordered"></div>
                </div>
                <div id="rightModal" class="flex-column w-6">
                    <div id="colorsContainer"></div>
                    <input id="textInput" type"text">
                </div>
            </div>`
        this.background = document.getElementById('modalBackground')
        this.display = document.getElementById('modalDisplay')
        this.dayPreview = document.getElementById('dayPreview')
        this.colorsContainer = document.getElementById('colorsContainer')
        this.colorsContainer.innerHTML = this.colorsTemplate()
        this.allColorButtons = this.colorsContainer.querySelectorAll('button')
        this.textInput = document.getElementById('textInput')
        this.addFunctions()
    },
    addFunctions(){
        this.background.addEventListener('click',()=>{
            this.toggleDispay()
            calendar.addDays()
        })
        this.allColorButtons.forEach((button)=>{
            button.addEventListener('click',(event)=>{
                this.addToDay(event.target.classList[0])                
            })
        })
        this.textInput.addEventListener('keyup',(event)=>{
            this.editingElement.innerText = this.textInput.value
            if (event.key === 'Enter' || event.keyCode === 13) {
                this.updatePreviewElements()
                this.textInput.value=""
            }   
        })

    },
    toggleDispay(){
        this.container.classList.toggle('hidden')
    },
    displayModal(x){

        this.dayPreview.innerHTML=calendar.allContainers[x].innerHTML
        this.toggleDispay()
        this.currentDay = this.dayPreview.querySelector('.dayNumber').id
        this.allPreviewElements = this.dayPreview.querySelectorAll('.dayElement')
        this.allPreviewElements.forEach((element,index)=>{
            element.addEventListener('click',()=>{
                this.deleteElement(index)
            })
        })

    },
    deleteElement(removeIndex){
        let html = ""
        this.allPreviewElements.forEach((element,index)=>{
            element.id=""
            if(index!=removeIndex){
                html+=element.outerHTML
            }
        })
        console.log(html)
        this.dayPreview.querySelector('.container').innerHTML = html

        this.updatePreviewElements()

    },
    updatePreviewElements(){
console.log('updating')
        let save = []
        this.allPreviewElements = this.dayPreview.querySelectorAll('.dayElement')
        this.allPreviewElements.forEach((element,index)=>{
            const content = element.querySelector('div')
            if(content){
                save.push([content.innerText,content.classList[0]])
            }
            element.addEventListener('click',()=>{
                this.deleteElement(index)
            })
        })
        localStorage.setItem(this.currentDay,JSON.stringify(save))
    },
    addToDay(color){
        let placed = false
        let fixedEdit = 99
        if(this.editingElement && this.editingElement.innerText.length<3){
            fixedEdit=this.editingIndex
        }
        this.allPreviewElements.forEach((container,index)=>{
            if(!placed && (container.innerHTML==="" || index===fixedEdit)){
                container.innerHTML = `<div class="${color}"></div>`
                placed = true
                this.editingIndex=index
            }
        })
        this.editingElement = this.allPreviewElements[this.editingIndex].querySelector('div')

    },
    colorsTemplate(){
        let newHtml = ""
        this.colors.forEach((color)=>{
            newHtml+=`
                <button id="color-${color[0]}" class="color-${color[0]}">${color[1]}</button>
            `
        })
        return newHtml
    }

}

modal.setup()