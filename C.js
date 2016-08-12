const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
input: fs.createReadStream('Indicators.csv')
});
//var ii;
var counter = 0;
//var jArray=[];
var header=[];
//var kArray = [];
 var arr1=[];
 var ind1;
//var final_obj={};
var index_countryname,index_indicatorname,index_year,index_value;



rl.on('line', function (line) {
if (counter === 0)
{
 header=line.split(',');
 index_countryname = header.indexOf('CountryName');
 index_indicatorname = header.indexOf('IndicatorCode');
 index_year = header.indexOf('Year');
 index_value = header.indexOf('Value');
  counter = 1;
}

   var myNewLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


 //var u=0;
 //var r=0;
 if((myNewLine[index_year]== 1965) && (myNewLine[index_indicatorname] =='SP.DYN.LE00.IN'))
 {

   //console.log("+++++++++++++++");
//console.log(Asian_Country);
   if(arr1.length==0)
   {

     var objj1={};
     objj1["countryname"]=myNewLine[index_countryname];
     //console.log(myNewLine[3]);
     if(myNewLine[index_indicatorname] =='SP.DYN.LE00.IN')
       {
         objj1["LE"]=parseFloat(myNewLine[index_value]);

       }
      // console.log( objj["LE"]);
            //console.log(objj);
      // console.log(objj);
     arr1.push(objj1);
   }
   else
   {

     for(ind1=0;ind1<arr1.length;ind1++)
     {

       if(arr1[ind1].countryname==myNewLine[index_countryname])
       {
         if(myNewLine[index_indicatorname]=='SP.DYN.LE00.IN')
         {
           arr1[ind1]["LE"]+=parseFloat(myNewLine[index_value]);
         }

         break;
       }
     }
     if(ind1==arr1.length)
     {
       var objj1={};
       objj1["countryname"]=myNewLine[index_countryname];
       if(myNewLine[index_indicatorname]=='SP.DYN.LE00.IN')
       {
         //console.log('xyz');
         objj1["LE"]=parseFloat(myNewLine[index_value]);

       }
       arr1.push(objj1);

     }
         }

 }
});

rl.on('close', function() {
//  console.log(arr);
arr1.sort(function(a,b){
  return b.LE-a.LE;

});
for(i=0;i<5;i++) {
  console.log(arr1[i]);
}

  var obj3=JSON.stringify(arr1);
  //console.log(obj2);
  fs.writeFile('second1.json',obj3);
});
