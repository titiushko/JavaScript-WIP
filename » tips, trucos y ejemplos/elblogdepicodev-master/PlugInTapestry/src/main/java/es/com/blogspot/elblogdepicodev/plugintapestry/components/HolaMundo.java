package es.com.blogspot.elblogdepicodev.plugintapestry.components;

import org.apache.tapestry5.MarkupWriter;

/**
 * @tapestrydoc
 */
public class HolaMundo {

	boolean beginRender(MarkupWriter writer) {
		writer.write("¡Hola mundo! (java)");
		return false;
	}
}