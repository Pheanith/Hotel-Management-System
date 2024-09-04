

const HomePage = ()=>{
  const box = {width: 200, height: 300, borderStyle:"dotted",backgroundColor: "red", marginTop: 20};
  const box2 = {width: 500, height: 700, borderStyle:"dotted", backgroundColor:"yellow", marginTop:50};
  return (


    <div>
      <h1 style={{color:"pink"}}>Welcome to Our Hotel</h1>
      {/* inline style in react */}
      <div style={{width:100, height:200, backgroundColor: "plum", borderStyle: "dotted"}}>
      </div>
      <div style={box}></div>
      <div style={box2}></div>
    </div>
    
);
};

export default HomePage;