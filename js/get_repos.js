function readFile( _path, _callback = console.log ) {
    let l_xmlHttp = new XMLHttpRequest();

    l_xmlHttp.onreadystatechange = function() {
        if ( ( l_xmlHttp.readyState == XMLHttpRequest.DONE ) && ( l_xmlHttp.status == 200 ) ) {
            _callback( l_xmlHttp.responseText );
        }
    };

    l_xmlHttp.open( "GET", _path, true );
    l_xmlHttp.send( null );
}

const l_profileLink = "https://raw.githubusercontent.com/lurkydismal";
const l_branch      = "main";

var l_markdownRenderer = window.markdownit();

( () => {
    for ( let _repositoryDiv of document.querySelectorAll( ".repository" ) ) {
        let l_repositoryName = _repositoryDiv.dataset[ "repository" ];

        readFile(
            l_profileLink + "\\" + l_repositoryName + "\\" + l_branch + "\\" + "README.md",
            _callback = (
                ( _mdContent ) => {
                    _repositoryDiv.innerHTML = l_markdownRenderer.render( _mdContent );
                }
            )
        );
    }
} )();