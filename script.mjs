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
console.log(gottenItem)
            let save =JSON.parse(gottenItem)
            save = save ? save : []
console.log(save)
            let elementsHtml = ""

            const numberSaves = save.length
            for(let j = 0; j <6; j++){
                if(j<numberSaves){
                    elementsHtml += `<div id="element${j}" class="dayElement"><div class="color-${save[j]}">${save[j]}</div></div>`
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
        console.log("this.allContainers",this.allContainers)
        this.allContainers.forEach((container) => {
            container.addEventListener('click',(event)=>{
                console.log('clicked')
                modal.displayModal(event.target)
            })
        });
    }

}

calendar.addDays()

const modal = {
    'colors':['green','red','blue','yellow','pink'],
    'currentDay':"",
    setup(){
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
        this.allDayElements = this.container.querySelectorAll('.dayElement')
        this.allDayElements.forEach((element)=>{
            console.log(element)
        })
        this.allColorButtons.forEach((button)=>{
            button.addEventListener('click',(event)=>{
                console.log(event.target.innerText)
                this.addToDay(event.target.innerText)
            })
        })
        console.log("this.allDayElements",this.allDayElements)
    },
    toggleDispay(){
        this.container.classList.toggle('hidden')
    },
    displayModal(target){
        this.dayPreview.innerHTML=target.parentElement.innerHTML
        this.toggleDispay()
        this.currentDay = this.dayPreview.querySelector('.dayNumber').id
 this.allDayElements = this.container.querySelectorAll('.dayElement')

    },
    addToDay(color){
        let placed = false
        this.allDayElements.forEach((container)=>{
            if(!placed && container.innerHTML===""){
                const text = this.textInput.value
                this.textInput.value=""
                container.innerHTML = `<div class="color-${color}">${text}</div>`
                placed = true
            }
        })
        let save  = []
        this.allDayElements.forEach((container)=>{
            const content = container.querySelector('div')
            if(content){
                save.push([content.innerText,content.classList])
            }

        })
console.log(save)
console.log(typeof save)
        localStorage.setItem(this.currentDay,JSON.stringify(save))
        console.log(this.allDayElements)
    },
    colorsTemplate(){
        let newHtml = ""
        this.colors.forEach((color)=>{
            newHtml+=`
                <button id=color-${color}>${color}</button>
            `
        })
        return newHtml
    }

}

modal.setup()