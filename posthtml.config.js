var date = new Date()
var mm = date.getMinutes()
if(mm<10) 
{
    mm=`0${mm}`;
}
var dateText = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${mm}`


module.exports = {
  plugins: {
    "posthtml-expressions": {
      locals: {
        BUILD_DATE: dateText
      }
    }
  }
};