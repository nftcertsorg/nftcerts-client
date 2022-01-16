export const truncateAddress = (address) => {
  if(!address) return
  return  address.slice(0, 4) + " ... " + address.slice(address.length - 4, address.length);
}

export const timeConverter = (UNIX_timestamp) => {
  if(!UNIX_timestamp) return
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}
