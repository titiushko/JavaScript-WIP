package es.com.blogspot.elblogdepicodev.tapestry.resteasy.components;

import org.apache.tapestry5.MarkupWriter;

public class HolaMundo {

    protected boolean beginRender(MarkupWriter writer) {
	    writer.write("Hola mundo Tapestry !!!");
		return false;
	}
}