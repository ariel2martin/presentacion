/* en inicio agregar
var io = require('socket.io').listen(server);
require('./camaraIOController')(io);
*/


webcams = {};


module.exports = (io) => {
    io.on('connect', (socket) => {
        console.log('nueva conexion para camara de vigilancia IO');


        // Initiate the connection process as soon as the client connects

        webcams[socket.id] = socket;



        // Asking all other clients to setup the peer connection receiver
        for (let id in webcams) {
            if (id === socket.id) continue;
            //console.log(id + ' --> '+ socket.id);                
            //console.log('sending init receive to ' + socket.id)
            webcams[id].emit('initReceive', socket.id);
        }

        /**
         * relay a peerconnection signal to a specific socket
         */
        socket.on('signal', data => {
            //console.log('sending signal from ' + socket.id + ' to ', data)
            if (!webcams[data.socket_id]) return;
            webcams[data.socket_id].emit('signal', {
                socket_id: socket.id,
                signal: data.signal
            });
        });

        /**
         * remove the disconnected peer connection from all other connected clients
         */
        socket.on('disconnect', () => {
            //console.log('socket disconnected ' + socket.id)
            socket.broadcast.emit('removePeer', socket.id);
            delete webcams[socket.id];
        });

        /**
         * Send message to client to initiate a connection
         * The sender has already setup a peer connection receiver
         */
        socket.on('initSend', init_socket_id => {
            //console.log('INIT SEND by ' + socket.id + ' for ' + init_socket_id)
            webcams[init_socket_id].emit('initSend', socket.id);
        });
    });
};