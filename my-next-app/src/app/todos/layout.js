export default function TodosLayout({ children }) {

  return <div style={{display: 'flex'}}>
    <div>
      Menu
      </div>
      <div>
        {children}
      </div>
  </div>

}