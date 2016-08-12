const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
input: fs.createReadStream('Indicators.csv')
});
var ii,i;
var counter = 0;
//var jArray=[];
var header=[];
//var kArray = [];
 var arr=[],arr1=[],s=[];
 var ind,ind1;

var index_countryname,index_indicatorname,index_year,index_value;
var Asian_Country = ["Arab World","East Asia & Pacific (all income levels)","East Asia & Pacific (developing only)",
"South Asia","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China",
"Georgia","Indonesia","Iran, Islamic Rep.","Iraq","Israel","Japan","Jordan","India"];
//var obj_Urban = {};

var tot=[];
//var arry=[];
for(ii=0;ii<Asian_Country.length;ii++)
{
  tot[ii]=0;
}


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

/*first*/
 if((Asian_Country.indexOf(myNewLine[index_countryname])!=-1)&&(myNewLine[index_indicatorname] =='SP.DYN.LE00.MA.IN'||myNewLine[index_indicatorname] =='SP.DYN.LE00.FE.IN'))
 {

   //console.log("+++++++++++++++");
//console.log(Asian_Country);
   if(arr.length==0)
   {

     var objj={};
     objj["year"]=myNewLine[index_year];
     //console.log(myNewLine[3]);
     if(myNewLine[index_indicatorname]=='SP.DYN.LE00.MA.IN')
       {
         objj["LEM"]=parseFloat(myNewLine[index_value]);
         objj["LEF"]=0;
       }
     else if(myNewLine[index_indicatorname]=="SP.DYN.LE00.FE.IN")
     {
       objj["LEF"]=parseFloat(myNewLine[index_value]);
       objj["LEM"]=0;
       //console.log(objj);
     }

    //  console.log(objj);
     arr.push(objj);


   }
   else
   {

     for(ind=0;ind<arr.length;ind++)
     {

       if(arr[ind].year==myNewLine[index_year])
       {
         if(myNewLine[index_indicatorname]=='SP.DYN.LE00.FE.IN')
         {
           arr[ind]["LEF"]+=parseFloat(myNewLine[index_value]);
         }
        else if(myNewLine[index_indicatorname]=='SP.DYN.LE00.MA.IN')
         {
           arr[ind]["LEM"]+=parseFloat(myNewLine[index_value]);
         }
         break;
       }
     }
     if(ind==arr.length)
     {
       var objj={};
       objj["year"]=myNewLine[index_year];
       if(myNewLine[index_indicatorname]=='SP.DYN.LE00.MA.IN')
       {
         objj["LEM"]=parseFloat(myNewLine[index_value]);
         objj["LEF"]=0;
       }
       else if(myNewLine[index_indicatorname]=='SP.DYN.LE00.FE.IN')
       {
         objj["LEF"]=parseFloat(myNewLine[index_value]);
         objj["LEM"]=0;
       }

       arr.push(objj);
        //console.log(objj);
     }
       //console.log(myNewLine[index_indicatorname]);
   }
 }


 /*second*/
 if((myNewLine[index_year]== 1965) && (myNewLine[index_indicatorname] =='SP.DYN.LE00.IN'))
 {

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
  /*first*/
  for(ind=0;ind<arr.length;ind++)
  {
    arr[ind].LEF/=Asian_Country.length;
    arr[ind].LEM/=Asian_Country.length;
  }
  //console.log(arr);
  var obj2=JSON.stringify(arr);
  //console.log(obj2);
  fs.writeFile('second.json',obj2);

  /*second*/
  arr1.sort(function(a,b){
    return b.LE-a.LE;
  });

  for(i=0;i<5;i++) {
    s.push(arr1[i]);
  }


    var obj3=JSON.stringify(s);
    //console.log(obj2);
    fs.writeFile('second1.json',obj3);
});
