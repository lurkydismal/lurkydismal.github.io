function readFile( _path, _callback = console.log ) {
    let l_xmlHttp = new XMLHttpRequest();

    l_xmlHttp.onreadystatechange = function() {
        if ( ( l_xmlHttp.readyState == XMLHttpRequest.DONE ) &&
             ( l_xmlHttp.status == 200 ) ) {
            _callback( l_xmlHttp.responseText );
        }
    };

    l_xmlHttp.open( "GET", _path, true );
    l_xmlHttp.send( null );
}

const g_repositoryOwnerName = "lurkydismal";
const g_branchName = "main";
const g_profileLink =
    `https://raw.githubusercontent.com/${g_repositoryOwnerName}`;

var g_markdownRenderer = window.markdownit().set( {
    breaks : true,
    linkify : true,
    typographer : true,
    highlight : function( _string, _language ) {
        if ( _language && hljs.getLanguage( _language ) ) {
            try {
                return hljs
                    .highlight(
                        _string,
                        { language : _language, ignoreIllegals : true } )
                    .value;

            } catch ( _exception ) {
                console.log( _exception );
            }
        }

        return ''; // use external default escaping
    }
} );

( () => {
    for ( let _repositoryDiv of document.querySelectorAll( ".repository" ) ) {
        let l_repositoryName = _repositoryDiv.dataset.repository;

        readFile( g_profileLink + "\\" + l_repositoryName + "\\" +
                      g_branchName + "\\" +
                      "README.md",
                  _callback = ( ( _mdContent ) => {
                      _repositoryDiv.innerHTML = g_markdownRenderer.render(
                          _mdContent.split( "## Table of Contents" ).at( 0 ) );
                  } ) );
    }
} )();
