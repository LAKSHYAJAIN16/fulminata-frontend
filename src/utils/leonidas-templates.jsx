const leonidasTemplates = {
    "default":
    `
      @(fontSize:20px)
      @(color:rgb(70, 70, 70))
      @(lineHeight:25px)
      @(fontWeight:600)
      @(fontFamily: -apple-system, BlinkMacSystemFont, Roboto, Oxygen, 'Segoe UI', Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif)
    `,

    "squid_game":
    `
      @(fontSize:20px)
      @(color:teal)
      @(fontWeight:800)
      @(fontFamily:-apple-system, BlinkMacSystemFont, Roboto, Oxygen)
      @(textAlign:left)
    `,

    "halloween":
    `
      @(display:flex)
      @(justifyContent:center)
      @(alignItems:center)
      @(alignSelf:center)
      @(flexDirection:column)
      @(fontSize:20px)
      @(color:black)
      @(fontWeight:900)
      @(fontFamily:Roboto, Oxygen)
      @(textAlign:center)
      @(backgroundColor:#ffc894)
      @(border:10px dotted black)
    `,

    "halloween_alt":
    `
      @(fontSize:20px)
      @(color:white)
      @(fontWeight:900)
      @(fontFamily:Roboto)
      @(backgroundColor:#873600)
      @(border:10px dotted black)
    `
}

export default leonidasTemplates;