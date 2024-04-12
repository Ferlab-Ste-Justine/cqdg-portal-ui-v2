/* eslint-disable max-len */
import cx from 'classnames';

import { IconProps } from 'components/Icons';

const RareIcon = ({ className = '', width = '18', height = '18' }: IconProps) => (
  <svg
    className={cx('anticon', className)}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 286 109"
    // enableBackground="new 0 0 286 109"
    // xmlSpace="preserve"
  >
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M227.000000,110.000000
	C151.709061,110.000000 76.418121,110.000000 1.063588,110.000000
	C1.063588,73.729599 1.063588,37.459057 1.063588,1.094257
	C96.216766,1.094257 191.433655,1.094257 286.825256,1.094257
	C286.825256,37.332706 286.825256,73.666245 286.825256,110.000000
	C271.253143,110.000000 255.595230,110.000000 239.482452,109.586273
	C240.391159,104.975281 241.085190,101.119820 237.157944,97.512772
	C233.729507,94.363876 231.268341,90.137245 227.751236,87.119347
	C225.822372,85.464302 222.593445,85.324387 219.335510,84.309669
	C225.187744,78.153809 225.401123,71.520386 224.936218,63.541309
	C226.597321,66.096588 227.330856,67.526459 228.362427,68.692711
	C228.932175,69.336861 230.001678,69.538971 230.845901,69.940361
	C231.247513,69.001862 231.649139,68.063354 232.421738,67.061699
	C234.531342,64.650299 236.269974,62.302052 238.008591,59.953808
	C238.170898,60.046787 238.333206,60.139767 238.495514,60.232742
	C241.289810,55.509327 244.084091,50.785908 247.019928,45.645645
	C248.256760,45.108521 249.352036,44.988247 249.890228,44.929146
	C255.098282,47.508263 260.375977,50.121868 266.155426,52.983955
	C264.809082,46.951313 269.428955,49.789368 271.163025,49.087475
	C269.688110,49.785397 268.462952,50.097118 267.281586,50.397694
	C267.039764,54.833809 268.951294,57.086327 272.765533,57.014145
	C276.390900,56.945534 281.063690,52.574585 280.995209,49.316078
	C280.889557,44.289314 276.893921,40.162231 271.750763,40.446056
	C272.250885,42.206699 272.464355,43.967590 273.233398,45.437897
	C274.511017,47.880589 273.681366,48.736240 271.302887,48.515244
	C270.705719,44.820049 270.061035,41.458279 269.397736,37.999500
	C267.541748,37.999500 265.714691,37.999504 263.887665,37.999504
	C262.305969,37.999504 260.724243,37.999500 259.142548,37.999500
	C266.605133,36.685318 266.605133,36.685318 267.133057,34.603580
	C268.769379,35.733242 270.563660,36.971973 272.357971,38.210705
	C272.681732,37.827526 273.005463,37.444347 273.329193,37.061172
	C269.012421,32.004417 265.037231,26.592129 260.265930,22.008497
	C256.736084,18.617479 256.613220,15.244229 257.344238,11.296756
	C257.826263,11.205629 258.308319,11.114503 258.790344,11.023376
	C259.079102,12.651471 259.367859,14.279565 259.949036,17.556330
	C262.071381,13.481807 263.577087,10.591054 265.087341,7.691608
	C261.795502,7.858657 257.920380,9.101182 256.915558,7.914100
	C253.639908,4.044394 251.436111,6.242715 250.032608,8.746507
	C248.692551,11.137096 248.667160,14.264630 247.717178,16.952137
	C246.986572,15.339822 246.602661,13.843589 246.075485,11.789029
	C244.081696,12.224457 241.351959,12.122787 239.505020,13.349856
	C232.974258,17.688717 226.638336,22.343971 220.439758,27.151598
	C216.262512,30.391478 212.440857,34.089817 208.586304,37.472343
	C212.537354,40.382763 215.743958,42.744797 218.981903,45.479340
	C220.179291,48.940434 221.345337,52.029011 222.511383,55.117592
	C212.390167,43.483833 194.865967,41.222832 184.127640,54.213543
	C177.119354,62.691795 177.507721,75.587563 184.818069,84.285072
	C190.409683,90.937698 202.111725,94.384796 211.728485,90.146347
	C212.807709,89.670700 214.663223,89.596077 215.451004,90.223755
	C216.158478,90.787430 215.727020,92.625145 216.094559,93.808754
	C216.597107,95.427162 217.118744,97.148178 218.092758,98.491196
	C220.939377,102.416275 224.014465,106.175667 227.000000,110.000000
M72.048111,79.840286
	C72.753670,82.007019 73.437096,84.181259 74.168953,86.339073
	C76.295242,92.608200 76.726234,92.826447 84.180222,91.228104
	C79.845222,78.334717 75.363251,65.540855 71.317970,52.610378
	C70.252716,49.205345 68.992722,47.949547 65.301682,47.892551
	C61.126877,47.828083 59.251694,49.097389 58.009007,53.170254
	C54.070286,66.079247 49.657223,78.843513 45.411343,91.712891
	C48.452042,91.712891 51.073215,91.712891 53.364990,91.712891
	C55.009590,87.265938 56.530052,83.154640 58.810131,78.987366
	C63.192379,79.018227 67.574623,79.049095 72.048111,79.840286
z"
    />
    <path
      fill="#3C6BF9"
      opacity="1.000000"
      stroke="none"
      d="
M232.050751,67.124847
	C231.649139,68.063354 231.247513,69.001862 230.845901,69.940361
	C230.001678,69.538971 228.932175,69.336861 228.362427,68.692711
	C227.330856,67.526459 226.597321,66.096588 224.936218,63.541309
	C225.401123,71.520386 225.187744,78.153809 219.335510,84.309669
	C222.593445,85.324387 225.822372,85.464302 227.751236,87.119347
	C231.268341,90.137245 233.729507,94.363876 237.157944,97.512772
	C241.085190,101.119820 240.391159,104.975281 239.013794,109.586273
	C235.307098,110.000000 231.614182,110.000000 227.460632,110.000000
	C224.014465,106.175667 220.939377,102.416275 218.092758,98.491196
	C217.118744,97.148178 216.597107,95.427162 216.094559,93.808754
	C215.727020,92.625145 216.158478,90.787430 215.451004,90.223755
	C214.663223,89.596077 212.807709,89.670700 211.728485,90.146347
	C202.111725,94.384796 190.409683,90.937698 184.818069,84.285072
	C177.507721,75.587563 177.119354,62.691795 184.127640,54.213543
	C194.865967,41.222832 212.390167,43.483833 222.511383,55.117592
	C221.345337,52.029011 220.179291,48.940434 219.149963,45.219833
	C219.896988,44.045124 220.507294,43.502438 221.436768,43.105900
	C223.844986,48.479420 225.934036,53.706787 228.264282,59.187088
	C229.687225,62.001633 230.868988,64.563240 232.050751,67.124847
M199.060944,53.042187
	C188.980270,55.839108 184.069763,65.240387 187.798203,74.393059
	C191.411606,83.263382 198.488098,85.754234 207.288147,83.188721
	C215.285629,80.857178 219.731949,72.437248 217.356018,64.822456
	C214.753448,56.481224 209.595444,52.987648 199.060944,53.042187
z"
    />
    <path
      fill="#3C6CFA"
      opacity="1.000000"
      stroke="none"
      d="
M221.117615,42.959755
	C220.507294,43.502438 219.896988,44.045124 219.118622,44.847317
	C215.743958,42.744797 212.537354,40.382763 208.586304,37.472343
	C212.440857,34.089817 216.262512,30.391478 220.439758,27.151598
	C226.638336,22.343971 232.974258,17.688717 239.505020,13.349856
	C241.351959,12.122787 244.081696,12.224457 246.075485,11.789029
	C246.602661,13.843589 246.986572,15.339822 247.682022,16.914055
	C247.993561,16.992052 247.926163,16.913305 247.966385,17.304836
	C248.645416,20.438641 249.284225,23.180918 249.721405,25.955788
	C249.519791,25.988379 249.114929,26.042641 248.723709,26.044609
	C246.661743,27.269989 244.990997,28.493399 243.320251,29.716810
	C244.072754,30.419636 244.825256,31.122459 245.577744,31.825279
	C246.732712,30.511662 247.887680,29.198044 249.311035,27.877317
	C249.941391,27.480295 250.303391,27.090385 250.910461,26.487251
	C252.087753,25.812902 253.019974,25.351778 253.969421,25.280142
	C253.919266,28.341347 256.104706,31.963533 251.660416,32.947224
	C247.475098,33.873600 246.630219,36.486225 246.747894,40.076797
	C246.539368,40.038807 246.115479,40.043022 245.808014,40.035961
	C245.295547,40.033779 245.090561,40.038654 244.573242,40.179050
	C245.179474,42.240128 246.098022,44.165684 246.982758,46.080574
	C246.948929,46.069908 246.878387,46.062496 246.878387,46.062492
	C244.084091,50.785908 241.289810,55.509327 238.495514,60.232742
	C238.333206,60.139767 238.170898,60.046787 238.008591,59.953808
	C236.269974,62.302052 234.531342,64.650299 232.421753,67.061691
	C230.868988,64.563240 229.687225,62.001633 228.632034,59.044708
	C228.204742,51.825291 228.029861,44.844807 221.117615,40.341633
	C221.117615,41.366779 221.117615,42.163265 221.117615,42.959755
M217.834320,36.303646
	C217.064468,35.635002 216.294617,34.966362 215.524765,34.297722
	C215.266190,34.823151 215.007614,35.348576 214.749039,35.874004
	C215.931305,36.236092 217.113556,36.598175 217.834320,36.303646
z"
    />
    <path
      fill="#3477E7"
      opacity="1.000000"
      stroke="none"
      d="
M58.050514,79.043343
	C56.530052,83.154640 55.009590,87.265938 53.364990,91.712891
	C51.073215,91.712891 48.452042,91.712891 45.411343,91.712891
	C49.657223,78.843513 54.070286,66.079247 58.009007,53.170254
	C59.251694,49.097389 61.126877,47.828083 65.301682,47.892551
	C68.992722,47.949547 70.252716,49.205345 71.317970,52.610378
	C75.363251,65.540855 79.845222,78.334717 84.180222,91.228104
	C76.726234,92.826447 76.295242,92.608200 74.168953,86.339073
	C73.437096,84.181259 72.753670,82.007019 72.015289,79.063812
	C71.053810,76.202133 70.125137,74.116936 69.128883,71.644226
	C67.859528,67.484436 66.657753,63.712170 65.455978,59.939903
	C65.079666,59.910938 64.703362,59.881977 64.327049,59.853016
	C62.917221,64.220970 61.507389,68.588921 59.738609,73.016693
	C55.715126,74.347855 57.286263,76.785469 58.050514,79.043343
z"
    />
    <path
      fill="#3C6CFA"
      opacity="1.000000"
      stroke="none"
      d="
M246.956436,40.114788
	C246.630219,36.486225 247.475098,33.873600 251.660416,32.947224
	C256.104706,31.963533 253.919266,28.341347 253.840851,24.944832
	C250.376419,22.319347 250.110519,20.344023 252.881668,17.433989
	C254.903809,15.310492 256.807861,12.453140 252.416641,9.604456
	C251.521271,12.189016 250.822662,14.440884 249.905792,16.600073
	C249.767410,16.925934 248.611435,16.819677 247.926163,16.913307
	C247.926163,16.913305 247.993561,16.992052 248.028717,17.030136
	C248.667160,14.264630 248.692551,11.137096 250.032608,8.746507
	C251.436111,6.242715 253.639908,4.044394 256.915558,7.914100
	C257.920380,9.101182 261.795502,7.858657 265.087341,7.691608
	C263.577087,10.591054 262.071381,13.481807 259.949036,17.556330
	C259.367859,14.279565 259.079102,12.651471 258.790344,11.023376
	C258.308319,11.114503 257.826263,11.205629 257.344238,11.296756
	C256.613220,15.244229 256.736084,18.617479 260.265930,22.008497
	C265.037231,26.592129 269.012421,32.004417 273.329193,37.061172
	C273.005463,37.444347 272.681732,37.827526 272.357971,38.210705
	C270.563660,36.971973 268.769379,35.733242 267.133057,34.603580
	C266.605133,36.685318 266.605133,36.685318 259.142548,37.999500
	C260.724243,37.999500 262.305969,37.999504 263.887665,37.999504
	C265.714691,37.999504 267.541748,37.999500 269.397736,37.999500
	C270.061035,41.458279 270.705719,44.820049 271.338318,48.474228
	C271.326294,48.766640 271.412781,48.701275 271.412781,48.701275
	C269.428955,49.789368 264.809082,46.951313 266.155426,52.983955
	C260.375977,50.121868 255.098282,47.508263 249.890228,44.929146
	C249.352036,44.988247 248.256760,45.108521 247.019928,45.645645
	C246.878387,46.062496 246.948929,46.069908 247.337357,45.765808
	C247.469345,43.679398 247.212891,41.897091 246.956436,40.114788
M264.675781,33.989647
	C268.349365,31.503078 263.762238,31.547260 263.660645,30.217255
	C263.264893,30.349529 262.869110,30.481804 262.473358,30.614079
	C262.938385,31.739685 263.403412,32.865292 264.675781,33.989647
z"
    />
    <path
      fill="#3C6DFA"
      opacity="1.000000"
      stroke="none"
      d="
M271.290833,48.807655
	C273.681366,48.736240 274.511017,47.880589 273.233398,45.437897
	C272.464355,43.967590 272.250885,42.206699 271.750763,40.446056
	C276.893921,40.162231 280.889557,44.289314 280.995209,49.316078
	C281.063690,52.574585 276.390900,56.945534 272.765533,57.014145
	C268.951294,57.086327 267.039764,54.833809 267.281586,50.397694
	C268.462952,50.097118 269.688110,49.785397 271.163025,49.087475
	C271.412781,48.701275 271.326294,48.766640 271.290833,48.807655
z"
    />
    <path
      fill="#3B6CF9"
      opacity="1.000000"
      stroke="none"
      d="
M58.430321,79.015350
	C57.286263,76.785469 55.715126,74.347855 60.126797,73.021088
	C63.648109,72.654350 66.422287,72.343048 69.196465,72.031738
	C70.125137,74.116936 71.053810,76.202133 71.969673,78.683640
	C67.574623,79.049095 63.192379,79.018227 58.430321,79.015350
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M199.485931,53.024467
	C209.595444,52.987648 214.753448,56.481224 217.356018,64.822456
	C219.731949,72.437248 215.285629,80.857178 207.288147,83.188721
	C198.488098,85.754234 191.411606,83.263382 187.798203,74.393059
	C184.069763,65.240387 188.980270,55.839108 199.485931,53.024467
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M221.436768,43.105904
	C221.117615,42.163265 221.117615,41.366779 221.117615,40.341633
	C228.029861,44.844807 228.204742,51.825291 228.390839,58.791779
	C225.934036,53.706787 223.844986,48.479420 221.436768,43.105904
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M247.966385,17.304836
	C248.611435,16.819677 249.767410,16.925934 249.905792,16.600073
	C250.822662,14.440884 251.521271,12.189016 252.416641,9.604456
	C256.807861,12.453140 254.903809,15.310492 252.881668,17.433989
	C250.110519,20.344023 250.376419,22.319347 253.823639,24.555344
	C253.019974,25.351778 252.087753,25.812902 250.731049,26.286869
	C250.178711,26.174204 250.050873,26.048700 249.923035,25.923195
	C249.284225,23.180918 248.645416,20.438641 247.966385,17.304836
z"
    />
    <path
      fill="#3C6CFA"
      opacity="1.000000"
      stroke="none"
      d="
M249.042664,27.884430
	C247.887680,29.198044 246.732712,30.511662 245.577744,31.825279
	C244.825256,31.122459 244.072754,30.419636 243.320251,29.716810
	C244.990997,28.493399 246.661743,27.269989 248.675446,26.349201
	C249.026474,27.062696 249.034561,27.473564 249.042664,27.884430
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M246.747894,40.076797
	C247.212891,41.897091 247.469345,43.679398 247.371185,45.776470
	C246.098022,44.165684 245.179474,42.240128 244.670425,40.427444
	C245.425125,40.374557 245.770294,40.208794 246.115479,40.043022
	C246.115479,40.043022 246.539368,40.038807 246.747894,40.076797
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M218.065063,36.631954
	C217.113556,36.598175 215.931305,36.236092 214.749039,35.874004
	C215.007614,35.348576 215.266190,34.823151 215.524765,34.297722
	C216.294617,34.966362 217.064468,35.635002 218.065063,36.631954
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M249.311035,27.877319
	C249.034561,27.473564 249.026474,27.062696 249.066650,26.347233
	C249.114929,26.042641 249.519791,25.988379 249.721405,25.955788
	C250.050873,26.048700 250.178711,26.174204 250.485977,26.500092
	C250.303391,27.090385 249.941391,27.480295 249.311035,27.877319
z"
    />
    <path
      fill="#3C6CFA"
      opacity="1.000000"
      stroke="none"
      d="
M245.808014,40.035965
	C245.770294,40.208794 245.425125,40.374557 244.982758,40.291924
	C245.090561,40.038654 245.295547,40.033779 245.808014,40.035965
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M69.128883,71.644226
	C66.422287,72.343048 63.648109,72.654350 60.485748,72.961266
	C61.507389,68.588921 62.917221,64.220970 64.327049,59.853016
	C64.703362,59.881977 65.079666,59.910938 65.455978,59.939903
	C66.657753,63.712170 67.859528,67.484436 69.128883,71.644226
z"
    />
    <path
      fill="currentColor"
      opacity="1.000000"
      stroke="none"
      d="
M264.272095,33.990273
	C263.403412,32.865292 262.938385,31.739685 262.473358,30.614079
	C262.869110,30.481804 263.264893,30.349529 263.660645,30.217255
	C263.762238,31.547260 268.349365,31.503078 264.272095,33.990273
z"
    />
  </svg>
);

export default RareIcon;
