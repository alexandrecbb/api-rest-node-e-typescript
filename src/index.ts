import { server } from './server/Sever';
import { Knex } from './server/database/knex';


const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`App rodando na porta ${process.env.PORT || 3333}`);
    });
};


if (process.env.IS_LOCALHOST !== 'true') {

    Knex.migrate.latest()
        .then(() => {
            startServer();
        }).catch((error) => {
            console.log(error);
        });

} else {
    startServer();
}