returnObj = {
    show:function()
    {
        var input = document.getElementById('search').value;
        var pages = document.getElementById('pages');
        console.log(input);

        if(input == "FAQ's")
        {
            pages.href = 'faqs.html';
        }
        else if(input == "Home")
        {
            pages.href = 'index.html';
        }
        else if(input == 'New DL' || input == 'New LL')
        {
            pages.href = 'before.html';
        }
        else if(input == "About Us")
        {
            returnObj.setCookieFunction(1);
            pages.href = 'showContent.html';
        }
        else if(input == "About Learner's License")
        {
            returnObj.setCookieFunction(2);
            pages.href = 'showContent.html';
        }
        else if(input == "About Driving License")
        {
            returnObj.setCookieFunction(3);
            pages.href = 'showContent.html';
        }
        else if(input == "About Renewal of License")
        {
            returnObj.setCookieFunction(4);
            pages.href = 'showContent.html';
        }
        else if(input == "About Registration")
        {
            returnObj.setCookieFunction(5);
            pages.href = 'showContent.html';
        }
        else if(input == "About permits")
        {
            pages.href = 'aboutpermits.html';
        }
        else if(input == "About Fees")
        {
            pages.href = 'aboutfees.html';
        }
        else if(input == "Contact Us")
        {
            pages.href = 'contactus.html';
        }
        else if(input == "RC Status")
        {
            pages.href = 'rcstatus.html';
        }
        else if(input == "DL Status")
        {
            pages.href = 'dlstatus.html';
        }
        
    },
    setCookieFunction:function(setval)
    {
          document.cookie = "Page="+setval;
    }
}
function Suggest(){
    this.xhr = new XMLHttpRequest();
    tempObj = this;
    this.search = null;
    this.timer = null
    this.getTerm = function()
    {   
        console.log('in');
          var dd = document.getElementById("dd");
          dd.innerHTML = "";
          if(tempObj.timer)
          {
              clearTimeout(tempObj.timer)
          }
          this.timer = setTimeout(tempObj.sendTerm,500);                    
    }
    
    
    this.sendTerm = function()
    {
          tempObj.xhr.onreadystatechange = tempObj.displayResults;
          tempObj.search = document.getElementById("search");
          // tempObj.xhr.open("GET","subthrot.php?term="+tempObj.search.value,true);
          var term = tempObj.search.value;
          if(term == '')
              term = -1;
          //tempObj.xhr.open("GET","subthrot.php?term="+tempObj.search.value,true);
          tempObj.xhr.open("GET","http://127.0.0.1:5000/api/search/"+term,true);
          tempObj.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
          tempObj.xhr.send();
    }
    

    this.displayResults = function()
    {
          if(this.readyState == 4 && this.status == 200){
              var json = JSON.parse(this.responseText);
              tempObj.search.style.backgroundColor = "white";
              if(json.length == 0)
              {
                  //tempObj.search.value = "No results found"
                  tempObj.search.style.backgroundColor = "red";
                  if(tempObj.search.value == '')
                      tempObj.search.style.backgroundColor = "white";
              }
              else{
                  tempObj.populateFood(json);
              }

          }
    }
    this.populateFood = function(items)
    {
        var dd = document.getElementById("dd");
        dd.innerHTML = "";
        var dt = document.getElementById("dt");
        for(var i=0;i<items.length;i++)
        {
            var option = document.createElement('option');
            option.value = items[i];
            dd.appendChild(option);
        }
    }


}
var obj = new Suggest();
