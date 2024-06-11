import { useState } from 'react'
import './App.css'

function App() {
  const [x1, setX1] = useState(null)
  const [x2, setX2] = useState(null)
  const [y1, setY1] = useState(null)
  const [y2, setY2] = useState(null)
  const [z1, setZ1] = useState(null)
  const [z2, setZ2] = useState(null)
  const [resultOpen, setResultOpen] = useState(false)
  const [resultx, setResultX] = useState(0)
  const [resulty, setResultY] = useState(0)
  let lcm1 = leastCommonMultiple(x1, x2) / Math.abs(x1);
  let lcm2 = leastCommonMultiple(x1, x2) / Math.abs(x2);
  // console.log(-2 + 1)
  // console.log(x1 + x2)
  function leastCommonMultiple(x1, x2) {
    let x1_list = []
    let x2_list = []
    let i = 1
    let CommonMultiple = null
    while (x1_list.length <= 1000) {
      x1_list.push(Math.abs(x1) * i)
      x2_list.push(Math.abs(x2) * i)
      i++;
    }
    for (let X1 of x1_list) {
      if (CommonMultiple) {
        break
      }
      for (let X2 of x2_list) {
        if (X1 === X2) {
          CommonMultiple = X1;
          break
        }
      }
    }
    return CommonMultiple;
  }

  function simultaneousEquation(leastCommonMultiple, x1, x2, y1, y2, z1, z2) {
    if (x1 * lcm1 == x2 * lcm2) {
      let Y = (z1 * lcm1 - z2 * lcm2) / (y1 * lcm1 - y2 * lcm2);
      let X = (-y1 * Y + z1) / x1;
      setResultX(X)
      setResultY(Y)
    } else {
      let Y = (z1 * lcm1 + z2 * lcm2) / (y1 * lcm1 + y2 * lcm2);
      let X = (-y1 * Y + z1) / x1;
      setResultX(X)
      setResultY(Y)
    }

  }
  function resultOpenFun(x1, x2) {
    if (x1 === null || x2 === null || y1 === null || y2 === null || z1 === null || z2 === null) {
      alert("すべての値を入力してください")
      return;
    }
    else {
      setResultOpen(true)
      const A = leastCommonMultiple(parseInt(x1), parseInt(x2))
      return (
        simultaneousEquation(A, x1, x2, y1, y2, z1, z2)
      )
    }
  }
  return (
    <>
      <h1>連立方程式の練習　加減法</h1>
      <br />
      <br />
      <br />
      <div className='expression'>
        <p className='left-expression'>
          {"{"}
        </p>
        <div>
          <h3><input type="number" onChange={(e) => setX1(parseInt(e.target.value))} />ｘ＋<input type="number" onChange={(e) => setY1(parseInt(e.target.value))} />ｙ＝<input type="number" onChange={(e) => setZ1(parseInt(e.target.value))} />・・・１</h3>
          <h3><input type="number" onChange={(e) => setX2(parseInt(e.target.value))} />ｘ＋<input type="number" onChange={(e) => setY2(parseInt(e.target.value))} />ｙ＝<input type="number" onChange={(e) => setZ2(parseInt(e.target.value))} />・・・２</h3>
        </div>
      </div>
      <button onClick={() => resultOpenFun(x1, x2)}>計算する</button>
      {resultOpen &&
        (
          <div>
            <div>
              <h3>答え</h3>
            </div>
            {console.log("xの最小公倍数は　" + leastCommonMultiple(parseInt(x1), parseInt(x2)))}
            {console.log(x1 + "*" + resultx + "×" + y1 + "*" + resulty + "=" + (x1 * resultx + y1 * resulty))}
            {console.log(x2 + "*" + resultx + "×" + y2 + "*" + resulty + "=" + (x2 * resultx + y2 * resulty))}
            <div >
              <p>ｘ＝{resultx} , ｙ＝{resulty}</p>

            </div>
            <div>
              <h2>解説 </h2>
              １の式を{lcm1}倍、２の式を{lcm2}倍にしてxの係数の絶対値をそろえる。
              <br />
              {x1 * (lcm1) === x2 * (lcm2) ? (
                <div>
                  <p> {x1 * (lcm1)}ｘ＋{y1 * (lcm1)} ｙ = {z1 * lcm1}</p>
                  <p> -{")"}{x2 * lcm2}ｘ＋{y2 * lcm2} ｙ = {z2 * lcm2}</p>
                  <hr />
                  <p>{y1 * (lcm1) - y2 * lcm2}y = {z1 * lcm1-z2 * lcm2}</p>  
                  <p>y={(z1 * lcm1-z2 * lcm2) /(y1 * (lcm1) - y2 * lcm2)}</p>              
                  </div>

              ) : (
                <div>
                  <p> {x1 * (lcm1)}ｘ＋{y1 * (lcm1)} ｙ = {z1 * lcm1}</p>
                  <p> +{")"}{x2 * lcm2}ｘ＋{y2 * lcm2} ｙ = {z2 * lcm2}</p>
                  <hr />
                  <p>{y1 * (lcm1) + y2 * lcm2}y = {z1 * lcm1 + z2 * lcm2}</p>                
                </div>
              )}
              <p>これを<strong>1</strong>式に代入して</p>
              <p>{x1} x + {y1} × {resulty} = {z1} , x = {resultx}</p>
            </div>
          </div>
        )}
    </>
  )
}

export default App
