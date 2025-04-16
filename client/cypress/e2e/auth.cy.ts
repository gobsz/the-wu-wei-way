class AuthForm {
  elements = {
    usernameInput: () => cy.get( "#usernameInput" ),
    emailInput: () => cy.get( "#emailInput" ),
    passwordInput: () => cy.get( "#passwordInput" ),
    confirmPasswordInput: () => cy.get( "#confirmPasswordInput" )
  }

  typeUsername ( text: string ) {
    if ( !text ) return
    this.elements.usernameInput().type( text )
  }

  typeEmail ( text: string ) {
    if ( !text ) return
    this.elements.emailInput().type( text )
  }

  typePassword ( text: string ) {
    if ( !text ) return
    this.elements.passwordInput().type( text )
  }

  typeConfirmPassword ( text: string ) {
    if ( !text ) return
    this.elements.confirmPasswordInput().type( text )
  }
}

const authInfo = {
  username: "gobsz",
  email: "g@gmail.com",
  password: "secret",
  confirmPassword: "secret"
}

describe( 'User Sign Up', () => {

  const signupform = new AuthForm()

  it( 'Goes to the sign up page', () => {
    cy.visit( '/signup' )
  } )

  it( `Types ${authInfo.username} as the username`, () => {
    signupform.typeUsername( authInfo.username )
  } )

  it( `Types ${authInfo.email} as the email`, () => {
    signupform.typeEmail( authInfo.email )
  } )

  it( `Types ${authInfo.password} as the password`, () => {
    signupform.typePassword( authInfo.password )
  } )

  it( `Types ${authInfo.confirmPassword} as the confirm password`, () => {
    signupform.typeConfirmPassword( authInfo.confirmPassword )
  } )

  it( "Submits the sign up form", () => {
    return
  } )

} )