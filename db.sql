CREATE TABLE application (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, created DATE NOT NULL, INDEX IDX_A45BDDC1296CD8AE (team_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE application_play_day (id INT AUTO_INCREMENT NOT NULL, application_id INT DEFAULT NULL, code VARCHAR(255) NOT NULL, rank INT NOT NULL, INDEX IDX_84BA064C3E030ACD (application_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE competition (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE field (id INT AUTO_INCREMENT NOT NULL, field_location_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, INDEX IDX_5BF54558C3FA9259 (field_location_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE field_in_application (id INT AUTO_INCREMENT NOT NULL, field_id INT DEFAULT NULL, application_id INT DEFAULT NULL, INDEX IDX_943D8E34443707B0 (field_id), INDEX IDX_943D8E343E030ACD (application_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE field_location (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE field_location_in_application (id INT AUTO_INCREMENT NOT NULL, field_location_id INT DEFAULT NULL, application_id INT DEFAULT NULL, INDEX IDX_663402CCC3FA9259 (field_location_id), INDEX IDX_663402CC3E030ACD (application_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, field_id INT DEFAULT NULL, round INT NOT NULL, datetime DATETIME NOT NULL, state VARCHAR(255) NOT NULL, INDEX IDX_232B318C443707B0 (field_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE game_event (id INT AUTO_INCREMENT NOT NULL, game_id INT DEFAULT NULL, player_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, created DATETIME NOT NULL, minute INT NOT NULL, INDEX IDX_99D7328E48FD905 (game_id), INDEX IDX_99D732899E6F5DF (player_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE `group` (id INT AUTO_INCREMENT NOT NULL, league_id INT DEFAULT NULL, letter VARCHAR(1) NOT NULL, INDEX IDX_6DC044C558AFC4DE (league_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE league (id INT AUTO_INCREMENT NOT NULL, competition_id INT DEFAULT NULL, level INT NOT NULL, INDEX IDX_3EB4C3187B39D312 (competition_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE player (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, birth_number VARCHAR(255) NOT NULL, number INT NOT NULL, INDEX IDX_98197A65296CD8AE (team_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE player_in_game (id INT AUTO_INCREMENT NOT NULL, game_id INT DEFAULT NULL, player_id INT DEFAULT NULL, team_id INT DEFAULT NULL, INDEX IDX_6864F1ADE48FD905 (game_id), INDEX IDX_6864F1AD99E6F5DF (player_id), INDEX IDX_6864F1AD296CD8AE (team_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE team (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE team_in_game (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, game_id INT DEFAULT NULL, relationship VARCHAR(255) NOT NULL, INDEX IDX_F6E97FDF296CD8AE (team_id), INDEX IDX_F6E97FDFE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE team_in_group (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, group_id INT DEFAULT NULL, INDEX IDX_9F7786C5296CD8AE (team_id), INDEX IDX_9F7786C5FE54D947 (group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, INDEX IDX_8D93D649296CD8AE (team_id), UNIQUE INDEX email (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB;
ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
ALTER TABLE application_play_day ADD CONSTRAINT FK_84BA064C3E030ACD FOREIGN KEY (application_id) REFERENCES application (id);
ALTER TABLE field ADD CONSTRAINT FK_5BF54558C3FA9259 FOREIGN KEY (field_location_id) REFERENCES field_location (id);
ALTER TABLE field_in_application ADD CONSTRAINT FK_943D8E34443707B0 FOREIGN KEY (field_id) REFERENCES field (id);
ALTER TABLE field_in_application ADD CONSTRAINT FK_943D8E343E030ACD FOREIGN KEY (application_id) REFERENCES application (id);
ALTER TABLE field_location_in_application ADD CONSTRAINT FK_663402CCC3FA9259 FOREIGN KEY (field_location_id) REFERENCES field_location (id);
ALTER TABLE field_location_in_application ADD CONSTRAINT FK_663402CC3E030ACD FOREIGN KEY (application_id) REFERENCES application (id);
ALTER TABLE game ADD CONSTRAINT FK_232B318C443707B0 FOREIGN KEY (field_id) REFERENCES field (id);
ALTER TABLE game_event ADD CONSTRAINT FK_99D7328E48FD905 FOREIGN KEY (game_id) REFERENCES game (id);
ALTER TABLE game_event ADD CONSTRAINT FK_99D732899E6F5DF FOREIGN KEY (player_id) REFERENCES player (id);
ALTER TABLE `group` ADD CONSTRAINT FK_6DC044C558AFC4DE FOREIGN KEY (league_id) REFERENCES league (id);
ALTER TABLE league ADD CONSTRAINT FK_3EB4C3187B39D312 FOREIGN KEY (competition_id) REFERENCES competition (id);
ALTER TABLE player ADD CONSTRAINT FK_98197A65296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1ADE48FD905 FOREIGN KEY (game_id) REFERENCES game (id);
ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD99E6F5DF FOREIGN KEY (player_id) REFERENCES player (id);
ALTER TABLE player_in_game ADD CONSTRAINT FK_6864F1AD296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
ALTER TABLE team_in_game ADD CONSTRAINT FK_F6E97FDF296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
ALTER TABLE team_in_game ADD CONSTRAINT FK_F6E97FDFE48FD905 FOREIGN KEY (game_id) REFERENCES game (id);
ALTER TABLE team_in_group ADD CONSTRAINT FK_9F7786C5296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
ALTER TABLE team_in_group ADD CONSTRAINT FK_9F7786C5FE54D947 FOREIGN KEY (group_id) REFERENCES `group` (id);
ALTER TABLE user ADD CONSTRAINT FK_8D93D649296CD8AE FOREIGN KEY (team_id) REFERENCES team (id);
