import '@styles/components/Maps.scss';

function GyeonggiMap({selectedArea}: {selectedArea: string}) {
  return (
    <svg className='map_svg' style={{background:'transparent', overflow:'visible'}} viewBox='0 0 800 850' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <filter id='dropshadow'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='7'></feGaussianBlur>
          <feOffset dx='0' dy='0' result='offsetblur'></feOffset>
          <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
        <filter id='dropshadow2'>
          <feGaussianBlur in='SourceAlpha' stdDeviation='1.4'></feGaussianBlur>
          <feOffset dx='1' dy='1' result='offsetblur'></feOffset>
          <feMerge>
            <feMergeNode></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g filter='url(#dropshadow)'>
        { Object.keys(paths).map((key, index) => (
          <path key={index}
                id={paths[key].id}
                className={'OUTLINE' + (selectedArea === key ? ' SELECTED' : '')}
                d={paths[key].d}></path>
        ))}
      </g><g filter='url(#dropshadow2)'>
      <path className='LINE' d='M 244 547 l -132 19 '></path>
      <path className='LINE' d='M 169 580 l -57 -14 '></path>
      <path className='LINE' d='M 224 371 l -100 -100 '></path>
      <path className='LINE' d='M 251 375 l -76 -152 '></path>
      <path className='LINE' d='M 318 574 l -182 146 '></path>
      <path className='LINE' d='M 336 568 l -161 192 '></path>
      <path className='LINE' d='M 349 574 l -127 217 '></path>
      <path className='LINE' d='M 325 553 l -232 114 '></path>
      <path className='LINE' d='M 374 575 l 64 236 '></path>
      <path className='LINE' d='M 278 485 l -213 -95 '></path>
      <path className='LINE' d='M 293 498 l -232 -62 '></path>
      <path className='LINE' d='M 309 507 l -248 -30 '></path>
      <path className='LINE' d='M 329 490 l -252 -156 '></path>
      <path className='LINE' d='M 275 534 l -190 -13 '></path>
      <path className='LINE' d='M 390 492 l 275 -193 '></path>
      <path className='LINE' d='M 370 515 l 312 -148 '></path>
      <path className='LINE' d='M 358 539 l -18 292 '></path>
      <path className='LINE' d='M 367 488 l -43 -50 '></path>
      <circle className='POINT' cx='244' cy='547' r='2'></circle>
      <circle className='POINT' cx='169' cy='580' r='2'></circle>
      <circle className='POINT' cx='224' cy='371' r='2'></circle>
      <circle className='POINT' cx='251' cy='375' r='2'></circle>
      <circle className='POINT' cx='318' cy='574' r='2'></circle>
      <circle className='POINT' cx='336' cy='568' r='2'></circle>
      <circle className='POINT' cx='349' cy='574' r='2'></circle>
      <circle className='POINT' cx='325' cy='553' r='2'></circle>
      <circle className='POINT' cx='374' cy='575' r='2'></circle>
      <circle className='POINT' cx='329' cy='490' r='2'></circle>
      <circle className='POINT' cx='390' cy='492' r='2'></circle>
      <circle className='POINT' cx='367' cy='488' r='2'></circle>
      <circle className='POINT' cx='370' cy='515' r='2'></circle>
      <circle className='POINT' cx='358' cy='539' r='2'></circle>
      <circle className='POINT' cx='278' cy='485' r='2'></circle>
      <circle className='POINT' cx='293' cy='498' r='2'></circle>
      <circle className='POINT' cx='309' cy='507' r='2'></circle>
      <circle className='POINT' cx='275' cy='534' r='2'></circle>
    </g><g filter='url(#dropshadow2)'>
      { Object.keys(paths).map((key, index) => (
        <text key={index}
              id={paths[key].id}
              className='TEXT'
              x={paths[key].x}
              y={paths[key].y}>
          {key}
        </text>
      ))}
    </g></svg>
  )
}

interface IPath { [key: string]: Record<string, string>; }
const paths :IPath = {
  '수원시 장안구' : { id: 'CD41111', x: '93', y: '667', d: 'M 335 531 l 3 1 3 2 0 2 0 1 0 1 2 3 1 4 -2 5 -1 4 2 5 -4 1 -2 1 -3 1 -4 0 -1 -1 -1 0 -2 0 -2 0 -1 0 0 0 0 0 0 0 -1 -1 -5 2 -1 -4 -3 -3 2 -2 1 -3 0 -4 1 -5 4 1 3 -2 3 -2 3 -1 2 -2 z ' },
  '수원시 권선구' : { id: 'CD41113', x: '136', y: '720', d: 'M 303 554 l 5 1 5 0 3 3 1 4 4 1 2 1 0 1 0 2 3 1 1 2 1 0 0 0 2 3 4 -1 2 1 0 0 2 0 2 2 3 2 1 3 -1 5 -2 2 -3 2 -1 3 -2 0 -1 -1 -1 0 -1 0 -2 -1 -1 1 -1 0 0 0 0 0 -2 -2 -4 -1 -5 1 -2 -3 -3 -1 -1 -4 -1 -2 -2 -2 -4 -1 -3 -4 -1 -5 1 -3 1 -2 2 -4 z ' },
  '수원시 팔달구' : { id: 'CD41115', x: '175', y: '760', d: 'M 343 559 l 1 4 1 0 0 1 0 1 0 2 -2 1 0 4 0 5 -3 -2 -2 -2 -2 0 0 0 -2 -1 -4 1 -2 -3 0 0 -1 0 -1 -2 -3 -1 0 -2 0 -1 -2 -1 -4 -1 5 -2 1 1 0 0 0 0 0 0 1 0 2 0 2 0 1 0 1 1 4 0 3 -1 2 -1 z ' },
  '수원시 영통구' : { id: 'CD41117', x: '222', y: '791', d: 'M 347 548 l 0 -1 1 1 3 1 1 5 0 3 3 1 5 0 3 0 0 2 0 2 -2 1 -4 1 0 1 0 0 -2 2 -1 2 0 1 2 2 2 2 0 -1 0 0 2 -1 1 4 -1 4 -4 2 -2 1 0 0 0 1 -1 2 -3 2 -2 0 -3 -1 -1 -2 1 -3 0 -1 -1 1 0 1 0 -3 -1 -3 0 -5 0 -4 2 -1 0 -2 0 -1 0 -1 -1 0 -1 -4 -2 -5 1 -4 2 -5 2 2 z ' },
  '성남시 수정구' : { id: 'CD41131', x: '323', y: '437', d: 'M 384 471 l 4 1 2 1 3 0 1 1 2 -1 0 2 -4 5 -3 6 -3 1 -4 3 -2 1 -2 0 -3 2 0 4 -1 4 -3 3 -1 0 0 0 0 0 -1 -1 -2 1 -1 0 0 0 -2 1 -2 3 -1 0 -1 0 -1 1 -1 0 -1 -1 -1 0 -1 0 -3 -1 -5 -2 -2 -1 1 -3 -1 -1 0 -1 0 -1 0 -1 0 -1 0 -1 0 -1 2 -2 5 1 4 -1 1 -3 3 -2 2 -1 1 -2 2 -4 3 -2 2 -1 2 0 1 1 2 -1 3 -2 2 -1 0 -1 0 0 z ' },
  '성남시 중원구' : { id: 'CD41133', x: '665', y: '299', d: 'M 398 472 l 1 4 2 3 2 1 1 4 0 4 0 5 -1 3 -2 2 -2 2 -2 0 1 1 -1 2 -2 2 -2 -1 -2 -1 -5 -2 -3 -1 -2 -1 -3 0 -3 0 -1 2 1 -4 0 -4 3 -2 2 0 2 -1 4 -3 3 -1 3 -6 4 -5 0 -2 z ' },
  '성남시 분당구' : { id: 'CD41135', x: '682', y: '367', d: 'M 358 509 l 1 0 1 -1 1 0 1 0 2 -3 2 -1 0 0 1 0 2 -1 1 1 0 0 0 0 1 0 3 -3 1 -2 3 0 3 0 2 1 3 1 5 2 2 1 2 1 -1 6 2 4 -3 2 0 0 0 0 -2 2 -1 3 -2 2 -2 2 -4 2 -2 3 0 1 1 1 1 4 -4 1 -2 1 -2 0 -2 0 -1 0 0 0 -2 -2 -2 -2 0 0 -1 0 -1 -2 -4 -2 -3 0 -2 -3 -4 -2 -3 0 -2 -3 -4 -1 -2 -1 -1 -1 1 -3 1 -3 1 -4 1 -4 3 -1 5 2 3 1 1 0 1 0 z ' },
  '의정부시' : { id: 'CD41150', x: '356', y: '344', d: 'M 370 323 l 3 1 2 2 2 1 2 3 3 1 3 2 1 2 -1 3 -3 0 -4 2 0 4 -1 5 -1 2 -3 2 -1 3 -2 2 -3 2 -2 0 -4 2 -1 3 -4 -1 -5 3 -2 1 0 0 -2 -3 -2 -1 0 0 -2 1 -2 -2 -2 -2 -4 0 1 -2 -1 -2 -1 -4 0 -4 -2 -4 -1 -1 0 -4 1 -2 0 -1 0 0 -1 -2 0 -3 3 -2 2 -2 1 0 1 1 1 0 1 0 1 0 2 0 2 0 2 1 5 1 4 -1 2 -1 3 -2 3 -2 2 -1 z ' },
  '안양시만안구' : { id: 'CD41171', x: '61', y: '437', d: 'M 304 486 l 1 2 3 1 1 4 -1 4 -3 2 -2 1 -2 2 0 4 1 2 2 1 2 3 0 1 -1 3 1 1 0 0 0 1 -2 0 -5 0 -4 1 -2 4 -1 2 -3 2 -1 -1 -1 -3 -1 -4 -3 -1 -1 -4 -1 -4 0 -4 -1 -2 -1 -2 3 0 3 -1 2 -4 1 -2 1 -1 -1 -1 1 -1 1 -3 4 0 4 -2 2 -3 z ' },
  '안양시동안구' : { id: 'CD41173', x: '60', y: '477', d: 'M 315 488 l 0 4 -1 2 0 2 3 3 2 1 0 2 3 4 -1 4 -2 2 -1 3 -2 4 -1 5 -2 1 -4 -2 -2 -4 -2 -3 1 -3 0 -1 -2 -3 -2 -1 -1 -2 0 -4 2 -2 2 -1 3 -2 1 -4 -1 -4 4 -1 z ' },
  '부천시' : { id: 'CD41190', x: '247', y: '456', d: 'M 260 455 l -1 3 -2 1 0 2 3 2 -1 3 -1 3 -1 1 3 0 4 1 -1 4 -1 2 -1 1 -3 -1 -1 0 -1 1 -1 -1 -4 -1 -4 -2 -2 -2 -2 0 -5 -2 -2 -1 -3 -3 -3 -1 -1 -3 1 -4 -1 -4 2 -3 3 -1 2 -1 0 -4 1 -5 0 -2 0 0 0 -2 2 -3 1 0 2 2 5 1 3 2 0 1 2 -1 0 0 0 0 3 -1 2 1 3 2 1 3 1 2 0 1 -1 2 0 4 1 1 0 0 0 1 z ' },
  '광명시' : { id: 'CD41210', x: '66', y: '390', d: 'M 279 462 l 1 1 0 2 -1 0 1 2 2 4 1 3 1 1 0 0 1 2 1 3 2 2 0 1 0 1 1 1 1 4 -1 3 -1 1 1 1 -1 1 -1 2 -2 4 -3 1 -3 0 1 2 1 2 -4 0 -4 -1 -1 -2 -2 -2 -1 -4 -1 -4 -1 -3 -1 -3 0 -2 1 -2 -1 0 1 -1 -1 0 0 0 0 -1 0 0 0 -1 0 -1 -2 -2 -1 1 -2 0 1 -1 1 -2 1 -4 4 -1 2 -3 3 -1 2 -2 z ' },
  '평택시' : { id: 'CD41220', x: '323', y: '695', d: 'M 261 726 l 2 -1 4 -3 -1 -1 -2 -3 -4 -8 0 -3 -5 0 -5 -2 -4 -3 -2 -1 -1 -2 4 -6 3 1 5 0 5 0 4 0 4 -1 2 -1 2 -3 2 -3 1 -2 2 -3 2 -4 1 -2 1 -3 2 -3 3 -1 3 -1 2 -2 1 2 3 2 4 0 2 1 3 1 3 0 1 -3 4 0 3 -1 1 -1 2 0 3 1 4 0 0 -3 1 -5 2 1 -1 -2 0 -4 0 -4 0 -2 1 -1 -1 -2 0 -2 1 0 0 -1 0 0 0 -1 0 0 -1 -1 1 0 2 -1 4 -1 5 -2 2 -1 0 -1 2 3 2 3 1 0 1 -2 6 0 1 1 0 1 1 -1 2 1 1 -1 1 0 1 1 2 -1 1 -1 -1 -2 1 -1 1 0 1 0 1 -1 3 -2 4 -1 3 0 -1 3 -1 4 -2 2 -2 1 1 4 1 2 1 3 2 4 1 3 0 2 0 4 -2 1 -5 0 0 4 3 2 2 1 2 -1 0 0 2 2 -1 3 -2 3 -2 2 -3 2 0 3 2 2 0 1 3 -3 3 0 4 0 4 2 1 3 -2 2 -1 3 0 2 2 2 1 3 -5 2 -2 2 -1 2 1 1 1 3 -4 1 -1 1 -2 1 -4 2 -3 2 -1 2 0 2 1 1 -1 2 -2 2 -2 -1 -1 0 -2 1 -3 2 -4 0 -2 2 -2 1 -5 1 -2 2 -2 0 -2 -1 -2 -2 -5 0 -4 0 -4 1 -2 2 -3 1 -6 2 -2 1 -5 1 -5 3 -5 3 -2 -1 -1 -3 -12 1 -2 0 -6 1 -2 0 -2 -1 -2 -2 -1 -6 -1 -2 -1 -7 -1 0 0 0 z ' },
  '동두천시' : { id: 'CD41250', x: '360', y: '257', d: 'M 334 256 l 0 -4 2 -3 1 -3 2 -1 2 -2 0 -1 0 -1 0 -2 3 -2 2 -2 2 -5 1 -3 2 -1 5 1 5 1 2 0 2 2 1 5 1 2 1 2 -1 2 0 0 0 1 0 1 2 1 3 1 1 3 2 4 1 2 2 3 4 1 3 1 1 2 1 3 2 3 0 2 -1 2 -1 3 -1 3 -1 -1 0 0 -2 1 -5 2 -2 2 -3 1 -2 1 0 0 -1 -1 -2 -1 0 0 -1 0 -2 -2 -5 0 -4 0 -3 -1 -3 -3 -1 -2 -1 -3 -2 -3 -3 -1 -4 -1 -3 -2 -2 -2 z ' },
  '안산시상록구' : { id: 'CD41271', x: '85', y: '521', d: 'M 283 518 l 3 1 1 4 1 3 1 1 -2 2 -1 3 -2 4 -1 2 -2 2 -2 1 0 0 0 1 0 2 3 1 4 1 5 -1 3 2 1 2 1 4 3 -1 4 2 1 4 -2 4 -1 2 -1 3 -2 -3 -2 -2 -2 -2 -4 0 -5 3 -4 0 -2 2 0 0 -2 -1 -2 1 0 0 0 1 0 0 0 0 0 1 0 1 -2 0 -3 2 -3 -3 -3 0 -2 -2 -1 -2 -2 -4 -2 -2 1 -1 0 0 -1 0 2 -2 6 -1 2 -1 0 -3 0 -3 0 -6 0 -1 -1 -2 1 -2 0 -1 -2 -2 1 -4 1 -2 1 -1 3 1 2 0 2 0 3 -2 2 -2 z ' },
  '안산시단원구' : { id: 'CD41273', x: '112', y: '566', d: 'M 182 547 l -3 1 -2 1 -3 2 -2 2 -3 2 -3 2 -1 1 1 1 -2 1 -1 3 -2 3 0 2 2 -1 4 1 2 3 3 2 4 0 2 1 1 2 0 1 0 0 0 1 0 1 1 1 2 4 2 2 2 2 4 2 2 1 0 2 0 2 0 3 0 1 1 -1 1 -6 -1 -2 -1 -3 -3 -4 -1 -2 0 -2 -1 0 0 0 1 0 -1 -1 1 0 0 3 1 2 4 7 1 2 0 6 0 3 -2 4 -1 1 2 1 0 0 -3 -1 -1 -2 0 -4 2 0 0 1 1 1 0 2 0 1 0 0 0 0 0 1 0 -1 1 -4 0 -2 -1 1 -1 0 0 0 0 -1 0 0 0 -1 -3 -3 -2 0 -3 -1 0 -1 0 0 0 -1 0 0 -1 -2 0 -4 -2 1 0 0 0 1 -1 -1 -2 0 -1 1 -2 0 1 -1 -2 2 -2 -1 1 -2 -1 1 -1 0 0 0 0 -1 -2 0 0 1 1 0 0 0 3 2 2 2 3 3 1 3 -4 -1 -1 -2 -2 2 -2 0 -1 -2 -4 -1 -2 4 -1 3 -1 2 -2 3 0 -1 -3 -3 1 -1 -2 0 -1 0 0 0 0 0 -1 -2 0 -3 2 0 1 1 1 -3 -2 -2 0 0 0 0 -1 1 -1 0 0 -1 -2 0 1 -3 0 -2 4 0 4 -2 -1 -3 -1 -2 1 0 1 -4 -2 -3 0 -2 0 0 0 0 -3 -4 -1 -2 -2 -1 -2 -2 2 0 4 2 1 3 2 -1 3 -1 1 -3 2 -2 -1 -3 2 1 1 0 3 -3 9 -6 4 -1 z M 261 524 l 3 1 4 0 -1 1 -1 2 -1 4 2 2 0 1 -1 2 1 2 0 1 0 6 0 3 0 3 -2 1 -6 1 -2 2 -4 -1 -2 2 -6 1 -4 -1 0 -1 -3 -1 -5 -1 -2 -2 -6 -1 -4 -3 1 -1 2 -2 2 -3 4 0 1 -3 3 -2 3 -2 0 -1 1 0 0 0 1 1 1 -1 0 0 2 1 4 1 2 -4 0 -2 3 -1 4 -1 3 -1 z ' },
  '고양시덕양구' : { id: 'CD41281', x: '272', y: '392', d: 'M 303 339 l -1 5 -2 1 0 3 0 5 0 4 -1 5 -1 3 -1 2 -1 4 -1 4 4 1 4 -1 4 -1 1 -4 1 -2 3 -2 4 0 4 2 2 1 4 2 1 3 -1 5 -2 3 -2 2 1 2 1 2 -1 1 1 1 0 1 -1 1 1 1 -2 0 -2 2 -1 -1 -2 1 -3 0 1 -2 -1 -2 -1 -3 -1 -4 -3 -2 0 -1 -2 1 -3 3 -2 1 -2 1 -6 0 0 5 0 5 -1 3 -1 2 -1 4 0 4 -1 4 -5 0 -2 1 -1 4 -4 2 -2 0 -3 2 -3 -2 -2 -2 -3 -2 -2 -1 -2 -2 -3 -2 -3 -3 -2 -2 -2 -1 -3 -2 -2 -2 -2 -2 -3 -2 -4 -3 1 -2 5 1 2 0 2 2 3 0 0 -3 1 -4 5 -2 2 0 0 -4 -1 -1 0 -1 3 -2 0 -3 3 -3 2 -2 2 -2 1 -1 1 0 1 0 2 -2 0 -4 -1 -3 -1 -2 -2 -4 -1 -5 2 -2 4 -2 4 1 2 2 2 1 5 1 4 -1 2 -4 0 -3 3 -2 4 -1 z ' },
  '고양시일산동구' : { id: 'CD41285', x: '175', y: '223', d: 'M 244 369 l 0 -3 0 -3 1 -2 -2 -1 -1 -3 2 -3 2 -2 2 -2 2 -2 2 -4 1 3 2 1 6 0 3 0 3 0 1 5 2 4 1 2 1 3 0 4 -2 2 -1 0 -1 0 -1 1 -2 2 -2 2 -3 3 0 3 -3 2 0 1 1 1 0 4 -2 0 -5 2 -1 4 0 3 -3 0 -2 -2 -2 0 -5 -1 -1 2 -3 -1 -4 -3 -2 -2 -2 -3 1 -1 2 -2 4 -3 4 -2 4 -3 z ' },
  '고양시일산서구' : { id: 'CD41287', x: '124', y: '271', d: 'M 239 358 l 3 -1 1 3 2 1 -1 2 0 3 0 3 -3 6 -4 3 -4 2 -4 3 -2 2 -1 1 -3 0 -2 -2 -4 -2 -3 -2 -3 -2 -2 -1 -4 -2 -1 -2 -1 -3 0 -3 1 -6 3 2 2 2 2 0 1 -1 0 0 1 -1 3 -1 4 -2 3 0 2 -1 4 -1 4 1 z ' },
  '과천시' : { id: 'CD41290', x: '77', y: '334', d: 'M 331 476 l 1 2 2 2 4 -1 2 -3 2 0 1 4 0 4 0 4 3 2 1 2 -2 2 0 1 0 1 0 1 0 1 0 1 0 1 -6 1 -4 0 -4 2 -2 1 -2 0 -3 -1 -1 1 -1 2 -3 -4 0 -2 -2 -1 -3 -3 0 -2 1 -2 0 -4 1 -4 2 -3 4 -1 3 -2 2 -1 1 -1 -1 -1 z ' },
  '구리시' : { id: 'CD41310', x: '380', y: '411', d: 'M 386 389 l 1 4 -1 3 -2 2 0 1 1 2 1 4 1 4 5 3 2 2 -2 2 0 1 4 2 -5 4 -3 2 -2 1 -5 0 -3 1 -3 2 -2 1 -3 1 -1 -4 0 -4 1 -4 1 -2 2 -3 1 -4 1 -5 -2 -4 -3 -1 0 -3 2 -2 0 -3 1 -3 4 1 1 0 1 0 3 -1 z ' },
  '남양주시' : { id: 'CD41360', x: '423', y: '380', d: 'M 432 323 l 1 1 2 2 4 0 4 0 4 1 3 2 0 0 1 0 2 1 2 2 2 3 1 4 2 3 1 1 1 5 3 2 1 3 0 4 1 4 1 2 -1 1 1 0 1 1 4 1 -2 1 1 2 1 2 1 2 2 0 0 2 -1 4 -1 5 -1 3 -1 3 -2 2 -3 2 -2 3 -1 4 -1 2 -1 2 0 5 -1 4 -2 4 0 2 -1 2 -2 5 -1 3 -2 2 -2 4 -1 2 -1 2 -1 5 0 3 -1 5 -2 2 -2 1 -3 0 -1 -3 0 -4 -2 -2 -2 -2 -4 -2 -2 -1 -3 -2 -3 -2 -2 -2 -1 -4 -1 -1 -2 -3 -3 -1 -1 -4 -2 -3 -2 -2 -2 -2 -2 -1 -6 0 -1 2 -2 2 -4 -2 0 -1 2 -2 -2 -2 -5 -3 -1 -4 -1 -4 -1 -2 0 -1 2 -2 1 -3 -1 -4 -4 0 -3 1 -1 0 -1 0 -4 -1 -3 0 -5 -2 0 -3 1 -5 0 -4 -1 -4 0 -4 -5 -2 1 -3 4 -2 2 0 3 -2 2 -2 1 -3 3 -2 1 -2 1 -5 0 -4 4 -2 3 0 1 -3 3 2 3 2 3 -1 1 -3 4 -4 4 0 4 -1 2 -2 1 0 1 3 3 3 1 1 4 -2 2 -2 4 -1 2 -1 2 -2 z ' },
  '오산시' : { id: 'CD41370', x: '348', y: '622', d: 'M 339 604 l 3 0 2 1 3 1 5 -1 2 2 0 1 0 1 0 0 0 2 1 1 1 4 0 4 2 2 2 1 5 1 1 4 1 2 2 2 -3 2 -1 1 -1 0 -1 0 -1 1 1 2 -1 1 -2 1 -1 -1 -1 0 -1 1 -2 -1 -1 1 0 -1 -1 -1 -6 0 -1 2 -1 0 -2 -3 -2 -3 -1 -2 -1 -4 0 -4 -2 -3 -3 -1 -4 -1 -2 -2 -1 -2 1 -1 2 -3 2 -1 0 0 -1 -2 3 -1 4 -2 z ' },
  '시흥시' : { id: 'CD41390', x: '247', y: '512', d: 'M 207 532 l 4 0 2 -2 0 0 0 0 0 0 0 -1 12 -16 4 0 1 -1 -1 2 -2 -2 -1 1 0 -1 2 -3 2 -2 3 1 4 0 0 2 6 0 2 1 -1 1 2 -2 1 -5 -1 -2 0 3 0 3 -2 1 1 0 -3 -1 -3 0 -1 -2 -6 -2 1 -3 1 -5 1 -3 3 -1 2 -2 0 0 0 -1 0 -1 0 -2 -1 -1 1 -2 0 -1 1 -1 2 -2 0 -5 0 -3 2 0 2 2 4 2 4 1 1 1 1 -1 1 0 3 1 2 0 1 -1 2 2 0 1 0 1 0 0 0 1 0 0 1 0 -1 1 1 0 -1 2 0 2 1 3 1 3 1 4 1 4 2 2 1 2 4 1 4 0 0 4 1 4 1 4 -3 4 -2 2 -3 2 -2 0 -2 0 -3 -1 -4 0 -3 -1 -3 3 -3 1 -4 1 -3 1 0 2 -2 4 -4 -1 -2 -1 0 0 -1 1 -1 -1 0 0 -1 0 0 1 -3 2 -3 2 -1 3 -4 0 -2 3 -2 2 -1 1 -4 -4 -5 -4 -3 -2 1 0 -1 -2 z ' },
  '군포시' : { id: 'CD41410', x: '298', y: '538', d: 'M 279 542 l 0 -1 0 0 2 -1 2 -2 1 -2 2 -4 1 -3 2 -2 3 -2 1 -2 2 -4 4 -1 5 0 2 0 0 -1 1 2 2 4 4 2 1 3 -1 4 -2 3 -2 2 -1 5 -1 3 -3 0 -3 2 0 1 1 2 1 4 -4 -2 -3 1 -1 -4 -1 -2 -3 -2 -5 1 -4 -1 -3 -1 z ' },
  '의왕시' : { id: 'CD41430', x: '330', y: '518', d: 'M 345 500 l 1 1 -1 3 2 1 -3 1 -1 4 -1 4 -1 3 -1 3 -2 4 -2 2 -1 2 0 3 -3 4 -2 2 -3 1 -3 2 -3 2 -4 -1 -1 5 0 4 -1 3 -2 2 -5 0 -5 -1 -1 -4 -1 -2 0 -1 3 -2 3 0 1 -3 1 -5 2 -2 2 -3 1 -4 -1 -3 2 -1 1 -5 2 -4 1 -3 2 -2 1 -4 1 -2 1 -1 3 1 2 0 2 -1 4 -2 4 0 z ' },
  '하남시' : { id: 'CD41450', x: '409', y: '448', d: 'M 405 415 l 2 1 2 2 2 2 2 3 1 4 3 1 2 3 1 1 1 4 2 2 3 2 3 2 2 1 4 2 2 2 2 2 0 4 -4 2 -2 1 -1 0 -2 0 -3 2 1 3 1 2 -1 2 -2 1 -2 1 0 1 0 1 -2 1 -5 0 -1 -1 -1 0 0 0 -2 -1 -5 0 -3 0 -5 -1 -3 0 0 3 1 2 -2 1 -2 1 -1 -1 -3 0 -2 -1 -4 -1 1 -1 2 -4 2 -1 1 -2 1 -4 -5 -2 -2 -1 -1 -2 1 -1 0 -1 0 -1 1 -1 3 -5 1 -3 1 -2 2 -3 4 0 3 -1 0 -4 0 -5 -1 -3 -1 -2 -1 -3 2 -2 1 -2 z ' },
  '용인시처인구' : { id: 'CD41461', x: '426', y: '603', d: 'M 370 641 l 2 -1 2 -2 1 -4 1 -3 1 0 1 0 0 -2 0 -5 2 -2 0 -1 0 0 0 0 0 -1 2 -1 4 -1 2 -1 2 -2 0 -4 0 -3 -2 -3 0 -2 1 -2 0 -1 -1 -2 -2 -4 3 -3 0 0 0 0 -1 -3 -1 -3 1 -3 2 -2 2 -2 3 -2 0 -4 1 -5 0 -4 -1 -5 -1 -2 -3 -2 -4 -1 -2 -2 -1 -2 -2 -4 1 -4 -1 -4 4 0 5 -2 3 0 2 -1 1 1 1 0 3 -1 2 -1 2 4 0 3 4 1 1 -3 2 -1 2 -5 -1 -3 5 -1 3 0 4 1 2 2 3 2 2 2 2 0 2 -1 2 0 0 3 -1 3 0 1 0 1 0 0 1 1 0 2 0 4 -2 2 0 2 1 3 0 1 -1 3 1 2 0 3 0 0 0 0 0 1 -1 2 1 2 2 0 4 1 3 1 0 -1 1 -1 2 -1 4 0 2 0 2 1 3 1 -1 4 0 2 0 1 0 1 -1 2 -1 3 1 5 -1 4 2 3 1 2 2 3 4 2 2 1 0 0 2 0 3 0 1 2 0 5 3 2 2 1 4 0 3 -1 1 0 1 2 0 4 0 5 1 3 3 1 3 2 -1 1 -1 2 1 2 -2 3 -1 3 -2 2 0 2 3 2 0 3 -1 5 -1 3 -2 0 -2 -2 -3 -2 -2 -3 -3 -1 -3 1 -1 2 -1 -2 -3 -1 -4 1 -1 2 -1 -1 -3 -2 -2 -2 -2 -2 -2 -2 0 0 -2 2 -3 3 -2 1 -2 -2 -2 -2 -2 -4 -1 -2 -2 -2 -4 -2 -1 -3 -1 -3 -1 -1 1 -1 -1 -1 -1 -1 -2 1 -2 2 -1 4 0 4 -1 4 -3 1 -3 1 -2 2 -5 2 -2 1 -1 2 -3 3 -1 2 -2 3 -4 2 -4 -1 -4 0 -4 -2 -4 1 -3 -1 0 0 -1 0 -1 0 -2 2 0 -2 -1 -3 -2 -4 -1 -3 -1 -2 z ' },
  '용인시기흥구' : { id: 'CD41463', x: '438', y: '811', d: 'M 354 570 l 0 -1 1 -2 2 -2 0 0 0 -1 4 -1 2 -1 0 -2 0 -2 1 -4 2 -5 1 -1 1 -2 -1 0 2 -2 4 1 5 1 4 -1 2 4 1 2 2 2 4 1 3 2 1 2 1 5 0 4 -1 5 0 4 -3 2 -2 2 -2 2 -1 3 1 3 1 3 0 0 0 0 -3 3 -2 1 -2 1 -3 0 -3 -1 -3 0 -4 0 -3 0 -3 1 -1 0 -2 -2 -2 -2 -3 -3 -1 -4 0 -2 0 0 2 -1 4 -2 1 -4 -1 -4 -2 1 0 0 0 1 -2 -2 z ' },
  '용인시수지구' : { id: 'CD41465', x: '338', y: '827', d: 'M 340 520 l 1 1 2 1 4 1 2 3 3 0 4 2 2 3 3 0 4 2 1 2 1 0 0 0 2 2 2 2 0 0 1 0 2 0 2 0 2 -1 4 -1 1 4 -1 4 -4 1 -5 -1 -4 -1 -2 2 1 0 -1 2 -1 1 -2 5 -1 4 -3 0 -5 0 -3 -1 0 -3 -1 -5 -3 -1 -1 -1 0 1 -1 -1 -2 -2 -1 -4 -2 -3 0 -1 0 -1 0 -2 -3 -2 -3 -1 0 -3 1 -2 2 -2 z ' },
  '파주시' : { id: 'CD41480', x: '257', y: '285', d: 'M 199 291 l 3 -1 4 0 1 -3 2 -3 1 -2 1 -3 -2 -2 -1 -1 -1 1 -3 1 1 -1 0 -1 -1 -1 3 -2 -1 -2 -1 1 -1 0 0 -3 1 -2 1 -2 0 -4 1 -4 -4 -1 -1 -4 0 -4 1 -4 1 -4 0 -3 1 0 1 0 2 -1 3 -2 2 -3 2 -2 2 -2 1 1 2 2 5 1 4 -1 2 -2 0 0 3 -2 2 -2 2 -1 2 0 1 1 0 0 2 1 0 -2 2 0 2 1 1 -1 2 -3 2 -1 2 0 0 3 2 5 0 2 3 2 2 4 4 -1 2 0 1 -3 1 -5 1 -3 3 -1 3 2 2 2 2 2 2 2 4 2 4 -2 -1 -3 0 -6 1 -2 4 0 2 2 3 1 3 2 1 0 4 0 2 -1 3 -2 2 -2 2 -2 2 -3 2 -1 4 -2 2 0 0 1 2 3 2 2 4 2 2 1 0 0 0 0 1 2 -2 1 0 3 -2 3 -1 -1 0 0 -1 2 -4 2 -1 3 -1 2 -3 3 -2 4 -2 1 -2 3 0 4 -1 3 -2 -1 -1 3 1 2 0 0 -2 2 -1 2 0 2 -1 5 0 4 0 4 -1 5 -2 4 -1 2 0 3 -2 2 -4 -1 -3 0 0 3 -2 3 -2 1 1 2 1 3 1 5 -2 4 0 3 0 0 2 0 4 1 4 1 3 0 0 1 -2 3 0 3 -1 5 0 5 0 3 -4 -1 -4 1 -3 2 0 3 -2 4 -4 1 -5 -1 -2 -1 -2 -2 -4 -1 -4 2 -2 2 -3 0 -3 0 -6 0 -2 -1 -1 -3 -2 4 -2 2 -2 2 -2 2 -2 3 -3 1 -6 1 -4 -1 -4 1 -2 1 -3 0 -4 2 -3 1 -1 1 0 0 -1 1 -2 0 -2 -2 -3 -2 0 -5 0 -2 1 -2 1 -5 0 -3 -1 -5 0 -1 2 0 0 -8 -2 -3 0 -1 -2 -11 2 0 0 -10 -2 0 -1 -10 -2 -1 z ' },
  '이천시' : { id: 'CD41500', x: '515', y: '600', d: 'M 513 528 l 2 3 2 2 1 2 3 1 6 2 2 1 2 3 2 1 0 2 0 3 2 1 4 1 1 4 -1 4 -2 2 -2 3 -1 4 0 5 1 4 1 4 -2 4 -2 2 0 3 1 0 0 1 -1 2 1 -1 0 1 0 2 0 1 0 1 1 1 0 5 0 3 -2 2 -2 4 1 4 2 3 1 0 1 -1 0 1 1 -1 3 0 2 1 0 -1 3 -1 3 0 3 2 1 0 1 -2 -1 -3 -1 -1 2 -2 5 0 4 2 2 3 2 2 1 2 2 3 1 1 1 -1 0 0 0 0 0 0 2 -1 1 1 0 1 -1 3 0 1 1 1 2 5 0 5 -1 4 1 4 0 4 -1 4 -3 2 -2 1 -4 2 -4 0 -2 0 1 1 2 4 0 3 -5 -1 -1 -1 -2 0 -3 2 -1 2 -2 3 1 5 -2 3 -3 1 -3 -2 -2 -1 -4 -2 -3 -1 -2 -1 -2 0 -2 2 -4 2 -4 -2 1 -2 0 0 1 0 2 -1 3 -2 1 -3 2 -5 0 -4 -1 -4 0 -4 -3 -2 -1 -3 -2 -4 -3 -1 -4 -1 -2 -1 -3 0 -4 -2 -2 -4 -1 -2 -3 -1 -4 0 -3 -2 -3 -1 -1 -3 0 -5 0 -4 -1 -2 -1 0 -3 1 -4 0 -2 -1 -3 -2 0 -5 -1 -2 -3 0 -2 0 0 0 -2 -1 -4 -2 -2 -3 -1 -2 -2 -3 1 -4 -1 -5 1 -3 1 -2 0 -1 0 -1 0 -2 1 -4 2 -2 1 -2 0 -1 -2 -3 1 -3 1 1 0 0 3 -2 1 -5 2 -1 1 -4 2 -1 2 -1 5 -1 3 -2 2 -1 3 -2 3 -2 2 -3 2 -2 2 -2 2 -3 2 -1 2 2 1 0 2 -1 4 -2 z ' },
  '안성시' : { id: 'CD41550', x: '445', y: '685', d: 'M 431 626 l 1 1 1 1 -1 1 1 1 1 3 1 3 4 2 2 2 1 2 2 4 2 2 2 2 2 -1 3 -3 2 -2 0 0 2 2 2 2 2 2 3 2 1 1 1 -2 4 -1 3 1 1 2 1 -2 3 -1 3 1 2 3 3 2 2 2 2 0 1 -3 1 -5 0 -3 -3 -2 0 -2 2 -2 1 -3 2 -3 -1 -2 1 -2 1 -1 4 0 3 1 1 2 2 4 4 2 3 0 2 1 4 1 3 1 2 4 1 3 3 2 0 4 1 4 0 4 -2 5 -1 3 -3 2 -2 1 -1 0 0 0 -2 1 -4 1 -3 1 -3 2 -1 2 0 5 0 5 -2 1 0 0 -1 1 -1 2 -1 1 -1 0 -1 1 -2 1 -2 3 -1 -1 -2 0 -2 1 -3 1 -4 0 -3 2 -1 3 0 4 2 2 2 3 -1 3 -4 1 -3 2 -1 3 -4 1 -3 1 0 0 -2 -2 -3 1 -2 3 -3 2 -2 1 -3 1 -3 2 -1 1 0 0 0 0 -1 0 -1 0 0 -1 0 1 -1 0 -2 -1 0 3 2 4 -1 4 -2 4 -3 2 -2 -2 -2 -3 -2 -3 -3 -1 -3 -2 -2 -1 -1 1 -2 0 -2 -2 -3 -1 -3 -2 -1 -1 -1 1 -1 -1 -1 -1 -2 -5 -1 -3 -3 -1 -4 -2 -2 -1 0 1 0 -1 -2 -2 -5 -1 -3 0 0 -1 1 -1 -2 -1 -5 1 -4 0 -4 -2 2 -1 1 -1 4 -1 -1 -3 -1 -1 1 -2 2 -2 5 -2 -1 -3 -2 -2 0 -2 1 -3 2 -2 -1 -3 -4 -2 -4 0 -3 0 -3 3 0 -1 -2 -2 0 -3 3 -2 2 -2 2 -3 1 -3 -2 -2 0 0 -2 1 -2 -1 -3 -2 0 -4 5 0 2 -1 0 -4 2 -2 1 0 1 0 0 0 3 1 4 -1 4 2 4 0 4 1 4 -2 2 -3 1 -2 3 -3 1 -2 2 -1 5 -2 2 -2 3 -1 3 -1 1 -4 0 -4 1 -4 2 -2 z ' },
  '김포시' : { id: 'CD41570', x: '181', y: '355', d: 'M 163 327 l 3 3 7 1 2 -1 3 -2 3 -2 2 -2 2 -2 4 -1 7 0 3 1 2 5 4 8 0 3 0 1 1 5 0 3 -1 5 -1 2 0 2 0 5 -1 6 0 3 1 3 1 2 4 2 2 1 3 2 3 2 4 2 2 2 3 0 2 3 2 2 4 3 3 1 4 3 3 2 2 2 2 2 3 2 0 4 1 4 -2 3 -4 0 -3 0 -2 -1 -2 -1 -2 2 -3 1 -2 -2 -3 -3 -5 0 -2 -1 -1 -2 -2 -3 -1 1 0 -1 -1 0 -2 1 0 -3 0 -2 -3 -3 -2 -1 0 0 -1 0 -2 -2 -3 -2 -2 -2 -4 -2 -2 0 -1 -1 0 2 -2 3 -4 2 -1 2 -1 3 -1 3 -2 3 0 -1 -2 0 -4 0 -2 2 -2 2 -2 1 0 -2 -4 -2 -2 -1 0 1 -2 0 -2 -1 -2 0 -1 1 -1 -3 -1 -4 0 -3 -1 -2 -1 -4 -2 -3 -2 -1 -1 -5 2 -2 1 -2 0 -2 0 0 -1 0 -1 -2 -4 -2 1 -1 1 -3 0 -2 0 -6 0 -3 -2 -2 -2 -3 1 -5 1 -4 1 -3 0 -2 1 -3 -1 -1 0 0 0 -1 -2 -3 -1 -3 -1 -2 0 -3 2 -7 5 3 7 3 z ' },
  '화성시' : { id: 'CD41590', x: '279', y: '621', d: 'M 275 568 l 0 -1 0 -1 0 0 0 0 0 -1 0 0 2 -1 2 1 0 0 2 -2 4 0 5 -3 4 0 2 2 2 2 2 3 1 5 3 4 4 1 2 2 1 2 1 4 3 1 2 3 5 -1 4 1 2 2 0 0 0 0 1 0 1 -1 2 1 1 0 1 0 1 1 2 0 1 -3 3 -2 2 -2 1 -3 1 -1 0 1 -1 3 1 2 3 1 2 0 3 -2 1 -2 1 5 3 3 2 2 2 2 1 0 3 -1 3 0 4 0 3 0 3 1 3 0 2 -1 2 -1 2 4 1 2 0 1 -1 2 0 2 2 3 0 3 0 4 -2 2 -2 1 -4 1 -2 1 0 1 0 0 0 0 0 1 -2 2 0 5 0 2 -1 0 -1 0 -3 0 -4 1 -2 -2 -1 -2 -1 -4 -5 -1 -2 -1 -2 -2 0 -4 -1 -4 -1 -1 0 -2 0 0 0 -1 0 -2 -2 -1 -5 1 -3 -1 -2 -1 -3 0 -1 1 -4 2 -3 1 1 2 0 0 -2 1 -2 3 -1 1 1 2 2 2 4 1 3 1 2 3 0 4 1 4 1 2 0 1 -2 1 -5 2 -4 1 -2 1 -1 0 1 1 0 0 0 1 0 0 0 1 -1 0 0 2 1 2 -1 1 0 2 0 4 0 4 1 2 -3 -1 0 5 0 3 -4 0 -3 -1 -2 0 -1 1 -3 1 -4 0 -1 3 -3 0 -3 -1 -2 -1 -4 0 -3 -2 -1 -2 -2 2 -3 1 -3 1 -2 3 -1 3 -1 2 -2 4 -2 3 -1 2 -2 3 -2 3 -2 1 -4 1 -4 0 -5 0 -5 0 -3 -1 1 -2 -2 -4 -4 -1 -5 0 -4 0 -3 -1 0 -2 -1 1 0 -3 1 -4 2 -2 1 -1 -14 -14 -5 -6 -4 -3 -2 -2 -2 -2 -2 -2 -1 -2 2 -1 -1 -5 -2 -4 2 -3 3 -2 3 -1 -2 -2 -5 -2 -6 1 -3 0 2 -2 0 -1 0 -2 -1 -3 2 -3 1 -2 1 -2 0 0 -1 -1 -2 0 -3 3 -1 -1 1 0 0 -1 1 0 1 -2 2 -2 5 0 2 -1 4 -2 1 -2 1 -2 -3 0 -3 1 -1 3 -3 -1 -1 -3 1 -3 1 -1 0 -1 1 -1 0 -2 -3 -2 -1 -3 0 -3 2 1 1 -1 1 -1 3 -5 1 -1 2 -2 1 1 0 0 1 0 1 0 0 0 2 1 3 1 5 1 2 1 0 0 0 0 2 1 5 -2 3 0 2 2 2 2 0 3 -2 2 2 0 0 3 1 -4 1 -5 2 1 1 5 1 3 -2 3 -2 2 1 2 0 2 -2 0 -3 0 2 0 4 0 1 -4 2 -3 0 -2 0 0 1 -1 0 -1 -2 -2 0 -3 3 -1 2 -6 0 -3 1 -2 1 -1 2 1 2 0 -1 -1 0 -1 0 0 -1 -2 0 -2 3 -1 1 3 4 2 2 2 0 -1 0 0 1 0 3 1 2 3 2 2 0 -2 3 -2 3 1 2 3 3 0 -3 0 -2 -3 -1 -1 -1 -2 4 -1 2 -1 z M 234 673 l 4 -1 3 0 -2 0 0 -3 2 -1 1 -3 -1 2 -2 1 -3 1 0 -2 0 -3 0 -2 0 -1 0 0 0 0 1 -2 1 -4 0 -5 -2 -2 -1 -2 0 -3 2 -2 2 -3 3 -1 6 0 4 -3 3 -2 -2 -2 -1 -3 -2 -1 -1 0 -2 1 -3 0 0 -1 3 -1 2 -2 0 0 0 -1 2 -1 -2 -1 0 -1 0 0 1 -1 0 -1 -1 1 0 -1 -1 -1 1 -2 -1 0 1 -1 1 0 0 0 -1 -2 1 -4 -2 1 1 1 0 0 -2 1 -1 6 -2 0 1 1 0 1 -2 0 -5 2 -4 0 -4 0 -2 5 -1 2 -2 1 -2 4 -1 1 1 1 -2 0 -2 2 -3 1 -3 1 -2 2 -3 2 -2 3 5 5 z ' },
  '광주시' : { id: 'CD41610', x: '445', y: '506', d: 'M 380 532 l 0 -1 2 -3 4 -2 2 -2 2 -2 1 -3 2 -2 0 0 0 0 3 -2 -2 -4 1 -6 2 -2 1 -2 -1 -1 2 0 2 -2 2 -2 1 -3 0 -5 0 -4 -1 -4 -2 -1 -2 -3 -1 -4 -1 -2 0 -3 3 0 5 1 3 0 5 0 2 1 0 0 1 0 1 1 5 0 2 -1 0 -1 0 -1 2 -1 2 -1 1 -2 -1 -2 -1 -3 3 -2 2 0 1 0 2 -1 4 -2 1 3 3 0 2 -1 2 -2 1 -5 1 -2 3 -2 2 -2 3 0 4 0 4 0 2 1 3 2 2 2 1 2 2 5 1 2 1 2 0 3 -1 3 0 0 1 2 2 5 -1 4 -1 4 -3 0 -3 1 1 2 1 3 2 1 1 0 0 0 1 2 2 5 2 2 3 2 0 4 2 2 2 3 1 4 1 2 2 2 4 0 4 1 1 4 0 5 -1 4 -2 1 -2 3 -2 2 -2 2 -2 3 -3 2 -3 2 -2 1 -3 2 -5 1 -2 1 -2 1 -1 4 -2 1 -1 5 -3 2 0 0 -1 -1 -1 3 2 3 0 1 -1 2 -2 2 -3 -1 -2 -1 -2 0 -4 0 -2 1 -1 1 0 1 -3 -1 -4 -1 -2 0 -1 -2 1 -2 0 -1 0 0 0 0 0 -3 -1 -2 1 -3 0 -1 -1 -3 0 -2 2 -2 0 -4 0 -2 -1 -1 0 0 0 -1 0 -1 1 -3 0 -3 -2 0 -2 1 -2 0 -2 -2 -3 -2 -2 -2 -4 -1 -3 0 -5 1 1 3 -2 5 -2 1 -1 3 -4 -1 0 -3 -2 -4 -2 1 -3 1 -1 0 -1 -1 -2 1 -3 0 -5 2 -4 0 -1 -4 z ' },
  '양주시' : { id: 'CD41630', x: '330', y: '309', d: 'M 292 300 l 2 -1 2 -3 0 -3 3 0 4 1 2 -2 0 -3 1 -2 2 -4 1 -5 0 -4 0 -4 1 -5 0 -2 1 -2 2 -2 0 0 -1 -2 1 -3 2 1 1 -3 0 -4 2 -3 2 -1 2 2 2 0 2 1 4 1 2 2 2 2 0 4 0 5 2 2 3 2 4 1 3 1 2 3 1 3 1 2 3 3 3 1 4 0 5 0 2 2 1 0 0 0 2 1 1 1 0 0 2 4 1 4 1 5 1 2 0 2 0 5 0 3 -1 2 0 4 -2 4 -1 2 -2 3 -4 1 -2 1 -3 2 -3 2 -2 1 -4 1 -5 -1 -2 -1 -2 0 -2 0 -1 0 -1 0 -1 0 -1 -1 -1 0 -2 2 -3 2 0 3 1 2 0 0 0 1 -1 2 0 4 1 1 2 4 0 4 1 4 1 2 -1 2 -2 5 0 3 -3 0 -4 2 -4 -2 -2 -1 -4 -2 -4 0 -3 2 -1 2 -1 4 -4 1 -4 1 -4 -1 1 -4 1 -4 1 -2 1 -3 1 -5 0 -4 0 -5 0 -3 2 -1 1 -5 0 -3 0 -5 1 -5 0 -3 2 -3 0 -1 -3 0 -4 -1 -4 -1 -2 0 0 0 0 -3 2 -4 -1 -5 -1 -3 z ' },
  '포천시' : { id: 'CD41650', x: '426', y: '231', d: 'M 377 327 l -2 -1 -2 -2 -3 -1 2 -3 1 -2 2 -4 0 -4 1 -2 0 -3 0 -5 0 -2 -1 -2 -1 -5 -1 -4 -2 -4 2 -1 3 -1 2 -2 5 -2 2 -1 0 0 1 1 1 -3 1 -3 1 -2 0 -2 -2 -3 -1 -3 -1 -2 -3 -1 -4 -1 -2 -3 -1 -2 -2 -4 -1 -3 -3 -1 -2 -1 0 -1 0 -1 0 0 1 -2 -1 -2 -1 -2 -1 -5 0 -4 1 -3 3 -1 4 0 3 2 1 1 5 -3 3 -2 1 -2 1 -5 -1 -5 -2 -1 -1 -2 0 -5 0 -2 0 0 -1 -1 -2 1 0 0 0 0 -1 0 -1 -1 -3 -1 -1 -5 1 -4 3 0 3 -2 2 -2 3 -1 1 5 4 -1 3 0 3 -2 2 0 1 1 3 0 0 -2 1 -5 -1 -4 -2 -2 0 -2 0 -4 -1 -6 -2 -2 -1 -2 1 -2 0 -1 -1 -2 1 -1 0 0 -1 -2 1 -2 0 -3 0 -3 -1 -2 1 -1 0 -1 -1 -2 0 -3 1 -2 1 -3 4 0 0 4 -1 2 0 0 0 2 2 4 3 3 2 2 2 2 2 2 2 2 1 1 0 -2 2 -3 3 -3 2 -2 3 -1 3 -2 2 -3 1 -2 1 -1 -1 -1 2 -2 4 0 1 0 2 2 2 1 0 2 -2 2 -1 3 0 5 -2 4 -2 2 0 2 1 4 1 1 2 4 3 0 5 0 2 1 0 0 0 1 1 3 1 4 4 2 2 1 2 0 0 -3 2 -2 3 -1 5 -2 3 -1 1 -3 4 0 5 1 2 1 1 2 6 1 2 -3 2 -1 1 2 2 1 2 5 0 5 1 4 0 4 -1 5 1 4 -2 4 -2 2 -2 2 -3 2 1 1 0 1 -1 2 -2 4 -1 3 -1 2 0 0 1 1 -2 3 -2 3 -3 1 -3 2 -1 1 -2 5 -1 2 -1 3 0 4 2 2 1 3 -2 2 -2 2 -2 2 -2 2 -3 2 0 1 -1 -1 -1 1 -1 -1 -3 -1 -3 0 -2 4 0 4 0 5 0 3 -2 2 0 3 1 2 -1 1 -2 2 -2 2 -1 0 -1 -1 -5 -1 -2 0 0 0 0 1 -2 3 -1 5 1 3 -2 3 -1 2 0 4 1 4 0 2 0 3 0 2 0 0 -1 3 -2 4 -1 3 -1 2 -2 4 -2 2 -2 1 -4 1 -2 2 -4 2 -1 -1 -3 -3 -1 -3 -1 0 -2 2 -4 1 -4 0 -4 4 -1 3 -3 1 -3 -2 -3 -2 -1 -2 -3 -2 -3 -1 z ' },
  '여주시' : { id: 'CD41670', x: '567', y: '555', d: 'M 530 490 l 2 2 2 2 1 3 1 4 4 1 5 -2 3 1 4 0 2 -2 1 1 1 0 2 -2 3 0 3 1 3 1 2 2 6 0 2 2 2 1 2 -1 1 -2 1 -3 2 1 2 1 6 0 2 1 -1 2 0 2 0 2 0 0 2 -1 3 -3 1 0 0 0 2 -1 1 0 2 3 -1 3 -2 2 -1 4 -1 4 2 3 1 -1 1 0 2 1 3 -1 5 -1 2 2 3 0 4 1 0 5 -1 5 1 3 0 5 1 4 1 3 0 0 0 0 0 2 1 4 -3 1 -2 2 -2 1 1 3 1 3 1 3 1 5 -1 4 -3 5 -1 4 0 4 1 4 -1 4 -3 2 -2 3 -1 4 0 2 -1 3 -2 2 -1 0 -1 0 -2 2 -2 3 -1 2 -1 4 -1 3 -2 2 0 4 -3 3 -3 -1 -3 0 -2 -1 -3 -1 -2 -3 -3 -1 -6 -1 -1 -1 0 -1 1 -3 0 -1 -1 -1 -2 1 0 0 -1 1 -1 -1 -2 -3 -1 -2 -2 -2 -2 -3 -4 -2 -5 0 -2 2 1 1 1 3 -1 2 -1 0 -3 -2 -3 0 -3 1 0 1 -2 -1 -3 0 -1 1 0 -1 -1 1 -1 0 -2 -3 -1 -4 2 -4 2 -2 0 -3 0 -5 -1 -1 0 -1 0 -1 0 -2 0 -1 -1 0 1 -1 0 -1 -1 0 0 -3 2 -2 2 -4 -1 -4 -1 -4 0 -5 1 -4 2 -3 2 -2 1 -4 -1 -4 -4 -1 -2 -1 0 -3 0 -2 0 0 -2 -1 -2 -3 -2 -1 -6 -2 -3 -1 -1 -2 -2 -2 -2 -3 -4 -1 -4 2 -2 1 -1 0 -2 -2 1 -4 0 -5 -1 -4 -4 -1 -4 0 -2 -2 -1 -2 -1 -4 -2 -3 -2 -2 0 -4 1 -2 2 -2 3 -2 2 -2 3 1 3 1 2 0 5 2 3 1 2 2 3 0 2 -2 2 -2 4 0 2 -2 3 -1 z ' },
  '연천군' : { id: 'CD41800', x: '340', y: '171', d: 'M 388 99 l 3 1 2 0 0 1 0 1 0 1 0 2 -1 3 1 2 2 2 2 3 1 1 -1 2 -1 3 2 2 1 3 -1 3 -1 2 0 3 1 2 0 1 -1 1 1 2 0 3 0 3 -1 2 1 2 0 0 -1 1 1 2 0 1 -1 2 1 2 2 2 1 6 0 4 0 2 2 2 1 4 -1 5 0 2 -3 0 -1 -1 -2 0 -3 2 -3 0 -4 1 -1 -5 -3 1 -2 2 -3 2 -3 0 -1 4 1 5 3 1 1 1 1 0 0 0 0 0 2 -1 1 1 0 0 0 2 0 5 1 2 2 1 1 5 -1 5 -1 2 -3 2 -5 3 -1 -1 -3 -2 -4 0 -3 1 -1 3 0 4 -2 -2 -2 0 -5 -1 -5 -1 -2 1 -1 3 -2 5 -2 2 -3 2 0 2 0 1 0 1 -2 2 -2 1 -1 3 -2 3 -2 -2 -2 -2 -4 -1 -2 -1 -2 0 -2 -2 2 -4 3 -3 1 -2 1 -3 4 -2 1 -2 0 0 1 1 2 -3 0 -3 2 -1 -1 -2 0 0 0 0 -2 -1 -4 -2 -2 -2 -2 -3 0 -1 -2 0 -4 2 -2 1 -2 3 -2 2 -2 2 -3 2 -2 1 -4 0 -1 0 -3 -2 -3 -1 -2 -2 -4 0 -1 2 0 6 1 3 -4 2 -4 -2 -2 -2 -2 -2 -2 -2 -3 -2 -3 1 -1 3 -1 5 -1 3 -2 0 -4 1 -2 -4 -3 -2 0 -2 -2 -5 2 -3 4 0 4 -2 -4 0 -2 1 0 0 -1 0 1 -1 -3 1 -2 0 0 -1 0 0 1 -1 -1 0 0 0 0 0 3 0 2 0 1 -1 1 0 0 0 1 0 1 0 0 0 -1 0 1 -1 -1 0 1 -1 0 0 0 -1 -1 0 0 -1 1 0 0 0 0 0 0 0 0 -1 -1 -1 1 -1 -1 0 2 -1 2 -3 1 0 0 0 1 0 -1 1 0 0 0 0 1 0 2 -5 4 0 1 -5 0 -4 2 -1 0 -3 -2 -1 2 -1 2 -2 2 -1 -1 -1 1 0 -1 -1 0 0 1 -3 0 -1 0 0 -1 0 -2 -2 0 -5 -2 -2 0 0 2 -2 2 -3 2 -1 4 -1 2 -4 1 -3 2 -1 3 -2 2 -1 2 1 0 0 2 -1 1 2 1 1 0 1 1 0 2 2 2 -1 0 -1 0 1 0 0 0 0 0 0 -1 -2 3 -1 4 -1 3 0 2 -2 2 -2 0 -1 -2 -2 -1 -2 0 0 0 -1 -1 1 -1 0 -1 -2 -1 -3 0 0 0 0 1 2 1 -2 0 0 0 -1 2 -1 2 -4 0 -2 0 0 1 0 2 -3 2 -2 0 0 0 0 0 1 1 0 0 -1 -1 -1 1 -2 1 -3 -1 -5 -1 -2 0 0 0 0 0 0 0 -1 0 -1 1 -2 0 0 1 0 0 0 1 0 1 -1 1 0 0 1 0 0 0 0 0 0 0 0 -1 0 3 1 2 1 0 -1 0 -1 0 1 2 0 4 2 4 0 -1 4 0 2 1 -3 1 4 4 -1 1 -1 -1 1 1 0 0 0 0 -1 0 1 0 -2 1 2 1 0 0 -2 -1 -2 2 -4 0 -2 0 1 2 -1 1 -2 2 -3 4 0 5 0 4 0 4 0 2 1 0 0 3 2 4 0 1 -2 0 0 1 0 z ' },
  '가평군' : { id: 'CD41820', x: '503', y: '305', d: 'M 504 200 l 1 4 1 4 2 2 2 2 3 1 5 1 3 1 1 1 5 0 4 0 4 0 3 1 1 5 1 5 -1 4 2 2 3 1 4 0 4 1 5 1 2 1 2 1 1 5 3 2 1 3 0 4 0 4 1 5 -1 4 -2 3 0 3 0 1 0 1 -1 2 -2 2 -4 0 -4 1 -3 2 -2 3 -1 3 -4 1 -1 1 -2 3 -4 1 -2 2 -2 3 0 4 1 2 2 2 1 4 -2 3 -2 2 -1 4 2 3 1 2 3 3 1 2 1 3 -1 4 -1 2 -3 2 -3 2 -3 2 -3 6 1 4 3 -1 3 -3 2 1 2 2 3 0 2 -2 4 -1 1 4 -1 5 -1 3 -2 5 0 2 0 1 0 2 0 1 -1 3 1 3 0 2 0 1 -2 2 -2 3 -2 1 1 3 3 2 1 3 4 2 1 3 2 2 1 4 -2 3 -1 2 0 3 -1 4 -5 0 -5 0 -4 -1 -2 2 0 0 -1 1 -1 2 -5 2 -4 -1 -5 -1 -2 -1 0 -2 0 -5 0 -2 0 0 1 -2 0 -4 -1 -1 0 -1 0 0 0 -1 0 -1 0 -2 -3 -2 -2 -2 -1 -4 -3 -2 -2 -2 -2 -2 0 -2 1 -2 0 -2 -3 -2 -2 -1 0 0 -2 2 -4 2 -2 1 -2 2 -1 2 0 0 -1 0 0 0 0 0 -2 0 -1 0 -1 0 -2 0 0 0 -3 1 1 -3 1 -5 1 -4 0 -2 -2 0 -1 -2 -1 -2 -1 -2 2 -1 -4 -1 -1 -1 -1 0 1 -1 -1 -2 -1 -4 0 -4 -1 -3 -3 -2 -1 -5 -1 -1 -2 -3 -1 -4 -2 -3 -2 -2 -2 -1 -1 0 0 0 -3 -2 -4 -1 -4 0 -4 0 -2 -2 -1 -1 1 -2 1 -3 2 -4 1 -3 0 0 0 -2 0 -3 0 -2 -1 -4 0 -4 1 -2 2 -3 -1 -3 1 -5 2 -3 0 -1 0 0 2 0 5 1 1 1 1 0 2 -2 2 -2 1 -1 -1 -2 0 -3 2 -2 0 -3 0 -5 0 -4 2 -4 3 0 3 1 1 1 1 -1 1 1 0 -1 3 -2 2 -2 2 -2 2 -2 2 -2 -1 -3 -2 -2 0 -4 1 -3 1 -2 2 -5 1 -1 3 -2 3 -1 2 -3 2 -3 -1 -1 0 0 1 -2 1 -3 2 -4 1 -2 0 -1 -1 -1 3 -2 2 -2 2 -2 2 -4 1 2 1 2 z ' },
  '양평군' : { id: 'CD41830', x: '553', y: '450', d: 'M 448 448 l 0 -3 1 -5 1 -2 1 -2 2 -4 2 -2 1 -3 2 -5 1 -2 0 -2 2 -4 1 -4 0 -5 1 -2 1 -2 1 -4 2 -3 3 -2 2 -2 1 -3 3 -1 0 0 2 0 1 0 1 0 2 0 0 0 0 0 1 0 0 0 1 -2 2 -2 2 -1 4 -2 2 -2 0 0 2 1 3 2 0 2 -1 2 0 2 2 2 2 2 3 2 1 4 2 2 3 2 0 2 0 1 0 1 0 0 0 1 1 1 0 4 -1 2 0 0 0 2 0 5 0 2 2 1 5 1 4 1 5 -2 1 -2 1 -1 0 0 2 -2 4 1 5 0 5 0 1 -4 0 -3 1 -2 2 -3 -1 -4 -2 -2 -1 -3 2 -2 0 -1 2 1 2 -1 0 0 0 0 1 1 2 -2 1 -3 3 -1 3 -2 1 -1 0 0 1 0 0 0 3 2 3 2 0 1 2 -1 1 1 2 2 2 2 3 1 2 3 2 0 2 0 1 0 0 2 3 3 3 2 2 2 3 2 2 2 0 1 -1 1 2 2 3 1 1 0 2 -1 4 -1 3 1 2 0 1 0 0 0 3 -1 2 0 2 2 4 2 3 1 2 1 1 -1 3 -2 3 2 2 3 1 2 2 2 5 2 2 0 3 2 2 2 0 2 0 1 0 0 0 1 0 0 -1 1 -2 2 -4 0 -4 1 -4 0 -1 3 -3 1 -2 3 -2 3 -2 2 -2 2 -3 2 -3 1 0 4 5 1 1 1 1 1 1 -1 0 3 2 2 3 3 2 1 0 1 -1 2 0 4 1 4 0 3 1 2 0 4 -2 2 -1 2 -1 5 -1 2 -1 3 -1 4 -1 3 -2 1 0 2 0 0 0 0 1 3 0 1 -3 1 -4 1 -4 -1 -3 0 -2 -2 -5 1 -3 1 -2 -1 -1 0 -1 1 -2 -3 1 -4 1 -4 2 -2 1 -3 -2 -3 -1 0 -2 1 0 0 -1 0 -3 3 -2 1 0 0 0 -2 0 -2 1 -2 -2 -1 -6 0 -2 -1 -2 -1 -1 3 -1 2 -2 1 -2 -1 -2 -2 -6 0 -2 -2 -3 -1 -3 -1 -3 0 -2 2 -1 0 -1 -1 -2 2 -4 0 -3 -1 -5 2 -4 -1 -1 -4 -1 -3 -2 -2 -2 -2 -4 -1 -3 1 -2 2 -4 0 -2 2 -2 2 -3 0 -2 -2 -3 -1 -5 -2 -2 0 -3 -1 -3 -1 -2 2 -3 2 -2 2 -1 2 -3 -2 -2 -2 -2 -5 -1 -2 0 0 -1 0 -2 -1 -1 -3 -1 -2 3 -1 3 0 1 -4 1 -4 -2 -5 -1 -2 0 0 1 -3 0 -3 -1 -2 -1 -2 -2 -5 -1 -2 -2 -2 -3 -2 -2 -1 -4 0 -4 0 -3 0 -2 2 -3 2 z ' },
}

export const GyeonggiLocationNames = Object.keys(paths);

export default GyeonggiMap;