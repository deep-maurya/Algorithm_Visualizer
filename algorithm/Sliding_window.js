document.addEventListener("DOMContentLoaded", () => {
    const inputArray = document.getElementById("inputArray");
    const windowSize = document.getElementById("windowSize");
    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const visualization = document.getElementById("visualization");
  
    let array = [];
    let windowLength = 0;
    let currentIndex = 0;
  
    let random_array_generate = document.getElementById("random_array_generate")
    random_array_generate.addEventListener("click", () => {
        let randomArray = generateRandomArray(13, 100);
        document.getElementById('inputArray').value = randomArray.join(',');
    })
    
    function generateRandomArray(size, max) {
        let arr = [];
        while (arr.length < size) {
            let num = Math.floor(Math.random() * max) + 1;
            if (!arr.includes(num) && num>5) {
                arr.push(num);
            }
        }
        return arr;
    }


    startButton.addEventListener("click", () => {
      array = inputArray.value.split(",").map(Number);
      windowLength = parseInt(windowSize.value);
      currentIndex = 0;
      nextButton.disabled = false;
      renderArray();
      highlightWindow();
    });
  
    nextButton.addEventListener("click", () => {
      if (currentIndex + windowLength < array.length) {
        currentIndex++;
        renderArray();
        highlightWindow();
      }
      if (currentIndex + windowLength >= array.length) {
        nextButton.disabled = true;
      }
    });
  
    function renderArray() {
      visualization.innerHTML = "";
      array.forEach((element, index) => {
        const div = document.createElement("div");
        div.className = "array-element";
        div.textContent = element;
        div.dataset.index = index;
        visualization.appendChild(div);
      });
    }
  
    function highlightWindow() {
      const elements = document.querySelectorAll(".array-element");
      elements.forEach(element => {
        element.classList.remove("window-element");
      });
      for (let i = currentIndex; i < currentIndex + windowLength && i < array.length; i++) {
        elements[i].classList.add("window-element");
      }
    }
  });
  