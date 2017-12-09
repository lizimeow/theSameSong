const axios = require('axios')




const url = 'http://dl.stream.qqmusic.qq.com/C100002feoW63tXVMP.m4a?vkey=9A2293CD87B586CAAD39133B818B3195F7152AF3CD4C16D394128C372E82743B13ED3D9E5C23CA8514A45254E52341DA44F1CAC522A561EA&guid=123456'


const a = axios.get(url).then(data => {
  console.log('=====');
  console.log(data);
}).catch(data => {
  console.log('----');
  console.log(data);
})
