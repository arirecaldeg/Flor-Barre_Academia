<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250610190243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE clase (id SERIAL NOT NULL, users_id INT NOT NULL, nombre VARCHAR(100) NOT NULL, nivel VARCHAR(50) NOT NULL, instructor VARCHAR(20) NOT NULL, descripcion TEXT NOT NULL, capacidad_maxima INT NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_199FACCE67B3B43D ON clase (users_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE horario (id SERIAL NOT NULL, clase_id INT NOT NULL, fecha TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, horario_inicio TIME(0) WITHOUT TIME ZONE NOT NULL, hora_fin TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_E25853A39F720353 ON horario (clase_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE notificacion (id SERIAL NOT NULL, email VARCHAR(100) NOT NULL, fecha_subscripcion DATE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE notificacion_user (notificacion_id INT NOT NULL, user_id INT NOT NULL, PRIMARY KEY(notificacion_id, user_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_FD0EB2CB4D633FC4 ON notificacion_user (notificacion_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_FD0EB2CBA76ED395 ON notificacion_user (user_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE reserva (id SERIAL NOT NULL, users_id INT NOT NULL, clases_id INT NOT NULL, fecha_reserva TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, estado VARCHAR(50) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_188D2E3B67B3B43D ON reserva (users_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_188D2E3B158CCF68 ON reserva (clases_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE "user" (id SERIAL NOT NULL, nombre VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, contraseña VARCHAR(255) NOT NULL, telefono INT NOT NULL, rol VARCHAR(50) NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.available_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN messenger_messages.delivered_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
                BEGIN
                    PERFORM pg_notify('messenger_messages', NEW.queue_name::text);
                    RETURN NEW;
                END;
            $$ LANGUAGE plpgsql;
        SQL);
        $this->addSql(<<<'SQL'
            DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase ADD CONSTRAINT FK_199FACCE67B3B43D FOREIGN KEY (users_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE horario ADD CONSTRAINT FK_E25853A39F720353 FOREIGN KEY (clase_id) REFERENCES clase (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE notificacion_user ADD CONSTRAINT FK_FD0EB2CB4D633FC4 FOREIGN KEY (notificacion_id) REFERENCES notificacion (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE notificacion_user ADD CONSTRAINT FK_FD0EB2CBA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reserva ADD CONSTRAINT FK_188D2E3B67B3B43D FOREIGN KEY (users_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reserva ADD CONSTRAINT FK_188D2E3B158CCF68 FOREIGN KEY (clases_id) REFERENCES clase (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase DROP CONSTRAINT FK_199FACCE67B3B43D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE horario DROP CONSTRAINT FK_E25853A39F720353
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE notificacion_user DROP CONSTRAINT FK_FD0EB2CB4D633FC4
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE notificacion_user DROP CONSTRAINT FK_FD0EB2CBA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reserva DROP CONSTRAINT FK_188D2E3B67B3B43D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE reserva DROP CONSTRAINT FK_188D2E3B158CCF68
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE clase
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE horario
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE notificacion
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE notificacion_user
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE reserva
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE "user"
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE messenger_messages
        SQL);
    }
}
