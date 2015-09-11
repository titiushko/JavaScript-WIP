package es.com.blogspot.elblogdepicodev.plugintapestry.components

import org.apache.tapestry5.MarkupWriter
import org.apache.tapestry5.internal.services.MarkupWriterImpl

import es.com.blogspot.elblogdepicodev.plugintapestry.services.dao.ProductoDAO

import spock.lang.Specification

class NumeroProductosSpec extends Specification {

    def conNombre() {
        setup:
        // Si tuviese alguna propiedad de algún servicio con la anotación @Inject tendríamos crear
        // un mock de la dependencia
        def dao = Mock(ProductoDAO.class)
        dao.countAll() >> 0l

        // Crear el componente
        def componente = new NumeroProductos()

        // Si tuviese parámetros (anotación @Parameter) deberíamos inyectarlos, para ello debemos
        // crear setters o cambiar el ámbito de visibilidad a package (sin ámbito)
        componente.dao = dao
		  
        // Ejecutar el sujecto bajo prueba
        def writer = new MarkupWriterImpl()
		  
        when:    
        componente.beginRender(writer)

        then:
        // Comprobar el resultado
        "Hay 0 productos" == writer.toString()
    }
}