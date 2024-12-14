import './App.css'
import SearchBar from '../components/SearchBar';

const HomePage = () => {  
    const itemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '8px',
    };
  
    const linkGroupStyle = {
      display: 'flex',
      gap: '35px',
    };
  
    const linkGroupStyle2 = {
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
    };
    
  
    const imageGroupStyle = {
      display: 'flex',
      gap: '10px',
      paddingRight: '30px',
    };
  
    const centeredItemStyle = {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px',
    };
  
    const centeredItemStyle2 = {
      display: 'flex',
      justifyContent: 'center',
    };
  
    const imageStyle = {
      width: '16px',
      height: '16px',
    };
  
    return (
      <div className="flex">
        {/* Primo item */}
        <div style={itemStyle}>
          <div style={linkGroupStyle}>
            <div style={linkGroupStyle2}> 
              <img src="Users.png" alt="Avatar" style={imageStyle} />
              <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Agenzie</a>
            </div>
            
            <div style={linkGroupStyle2}> 
              <img src="Dollar sign.png" alt="Avatar" style={imageStyle} />
              <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Mutuo</a>
            </div>
  
            <div style={linkGroupStyle2}> 
              <img src="Map.png" alt="Avatar" style={imageStyle} />
              <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Mappa</a>
            </div>
  
            <div style={linkGroupStyle2}>
              <img src="Life buoy.png" alt="Avatar" style={imageStyle} />
              <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)', whiteSpace: 'nowrap'}}>Fatti Guidare</a>
            </div>
          </div>
            
          <div style={imageGroupStyle}>
            <img src="Avatar.png" alt="Avatar" width="40" height="40" />
            <img src="Bell 03.png" alt="Bell" width="40" height="40" />
          </div>
        </div>
  
        {/* Secondo item (centrato) */}
        <div style={centeredItemStyle}>
          <img src="Logo.png" alt="Logo" width="200" />
        </div>
  
        {/* Terzo item */}
        <div style={centeredItemStyle2}>
          <SearchBar /> {/* Rimpiazzato con il nuovo componente */}
        </div>
      </div>
    );
};
  
  

export default HomePage;