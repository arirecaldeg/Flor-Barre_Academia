<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250610210359 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE clase DROP CONSTRAINT fk_199facce67b3b43d
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX idx_199facce67b3b43d
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase RENAME COLUMN users_id TO user_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase ADD CONSTRAINT FK_199FACCEA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_199FACCEA76ED395 ON clase (user_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase DROP CONSTRAINT FK_199FACCEA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_199FACCEA76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase RENAME COLUMN user_id TO users_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE clase ADD CONSTRAINT fk_199facce67b3b43d FOREIGN KEY (users_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_199facce67b3b43d ON clase (users_id)
        SQL);
    }
}
