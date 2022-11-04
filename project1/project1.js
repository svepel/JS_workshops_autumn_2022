

function validateForm(){

    var inputValue = document.getElementById("addItem").value;
    ///check if the value is empty or less than 3 characters
    if ((inputValue == null || inputValue=="") || inputValue.length <3) {
        var field =document.getElementById("addItem");
        field.style.borderColor = "red";
        field.select();
        field.focus();
        alert("Please write the name of item! It should be more than 2 characters");
    }else{
        /// add item to the list and create "delete" button
        var li = document.createElement("li"); 
        var itemNew =document.getElementById("itemsList");
        itemNew.innerHTML += `
        <div class="item">
                <span class="itemname">
                <input type='checkbox' class="newItemName"> ${document.querySelector('#newitem input').value}
                </span>
                <button class="delete">X</button>
            </div>
        `;

        /// save item to local storage
        localStorage.setItem('item', itemNew);


        /// remove item from the list
        var current_items = document.querySelectorAll(".delete");
        for(var i=0; i<current_items.length; i++){
            current_items[i].onclick = function(){
                this.parentNode.remove();
        
            }
        }    
    }

    /// cross the items if checked
    const checkbox = documents.quirySelectorAll('.newItemName')
    checkbox.addEventListener('change', (event) => {
        if (event.currentTraget.checked){
            newItemName.style.textDecoration = 'line-through';
           
        } else {
            newItemName.style.textDecoration = 'none';
        }
    }
    )
}


