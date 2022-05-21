describe('ChallengePHS', () => {
    
    before(() => {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/'); 
    })
    
    it('Auto Complete Venezuela', () => {

//step1: En Suggestion Class Example:
//Escribir en el input como país: "Vene" y seleccionar la palabra "Venezuela" que sugiere el input, validar que al realizar esto la palabra al final en el input sea "Venezuela"
    
        cy.get('#autocomplete').type('Vene')
        cy.get('.ui-menu-item').contains('Venezuela').click()
        cy.get('#autocomplete').should('have.value','Venezuela')

    })

    it('Obtain curso instructor precio', () => {
    
//Step2: En Web Table Example:
//Recorrer la grilla y obtener: curso, instructor y precio de los cursos que cuesten más de 30 y mostrarlo por consola 

        cy.get('fieldset > #product > tbody > tr').each(((el, i) => {
                        
            if(parseInt(el[0].children[2].innerHTML) > 30) {
                
                cy.log(`curso:${el[0].children[0].innerHTML}, instructor:${el[0].children[1].innerHTML}, precio:${el[0].children[2].innerHTML}`)
            }
        }))
    });

//Step3: En Web Table Fixed header:
//Recorrer la columna Amount, sumar todos los valores y validar que el total de los valores corresponde con "Total Amount Collected: 296"

    it('Amount collected 296', () => {

    let value = 0

        cy.get('.tableFixHead > #product > tbody > tr').each((el => {

        value = value + parseInt(el[0].children[3].innerHTML);
        

        })).then(() => {
            
            let totalAmount; 
            
            cy.get('.totalAmount').then(total => {

                totalAmount = parseInt(total[0].innerHTML.replace('Total Amount Collected:', ''));
                expect(value).to.be.equal(totalAmount)
            })
        })
    })
//En iFrame Example:
//Recorrer las categorías del header, guardarlas en un array y mostrar por consola ejemplo: [Home, Courses, etc ]
        
        it.only('iFrame exp', () => {
            
            cy.get('#courses-iframe').then(iframe => {
                    
                    const doc = iframe[0].contentDocument;
                    const lis = doc.querySelectorAll('.navigation')[0].querySelectorAll('li')
                    const categories = [];
                    
                    cy.wrap(lis).each((el) => {

                        if(el[0].innerText !== "") {
                            categories.push(el[0].innerText)
                        } else {
                            categories.push(el[0].querySelectorAll('a')[0].innerHTML)
                        }
                    })
                    cy.log(categories)
                })
    });
})
