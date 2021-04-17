-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: study_buddy_db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `flash_cards`
--

DROP TABLE IF EXISTS `flash_cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `term` varchar(255) DEFAULT NULL,
  `definition` varchar(500) DEFAULT NULL,
  `q_type` int DEFAULT NULL,
  `set_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_cards`
--

LOCK TABLES `flash_cards` WRITE;
/*!40000 ALTER TABLE `flash_cards` DISABLE KEYS */;
INSERT INTO `flash_cards` VALUES (1,'League of Nations','A vision of a world parliament where all the countries in the world discuss the world\'s issues.',1,1),(2,'Collective security','Where several countries work together so they can strengthen each other\'s security.',1,1),(3,'Permanent Court of International Justice','Where several countries work together so they can strengthen their security by discussion.',1,1),(4,'Mitigation','Where two or more countries have a disagreement and the case was brought before the whole of the League of Nations so that it could be resolved through discussion.',1,1),(5,'Moral condemnation','Where several countries would issue warnings to a country that had broken the Covenant of the League of Nations.',1,1),(6,'Economic sanctions','These sanctions were the last resort for the League when a country had broken one of the rules of the Covenant. It usually consisted of trade tariffs and restrictions and was made effective by the number of countries in the League.',1,1),(7,'What were the aims of the League of Nations?','1. To stop war\n2. Encourage disarmament\n3. Improve working conditions\n4. Reduce disease',1,1),(8,'Fontainebleau Memorandum','A document written by David Lloyd George during the Paris Peace Conference that declared his support behind the idea of the League of Nations.',1,1),(9,'The Assembly','Every member sent representatives to the Assembly and decisions had to be unanimous. If it wasn\'t, the decision was sent to the council. It was a world parliament.',1,1),(10,'The Council','The council met more frequently than the Assembly and could respond more quickly. They had a veto on any decision made by the assembly and elected non-permanent members every three years.',1,1),(11,'Secretariat','The civil service of the League of Nations. They did all the administrative work.',1,1),(12,'Agencies and special commissions','Special groups were put together to tackle issues of concern.',1,1),(13,'Structural strengths of the League of Nations','1. It had vast membership which made punishments like moral condemnation and economic sanctions more effective.\n2. The council was able to make some quick decisions\n3. Victorious nations had agreed and recognised its creation - suggesting that it had international respect.',1,1),(14,'Structural weaknesses of the League of Nations','1. The League had no army, that meant it could not force people to obey it. Therefore, its power was limited.\n2. Not all countries had equal rights and this caused tension\n3. The structure was very complicated and confused people. It also slowed down proceedings.',1,1),(15,'International Labour Organisation','To bring workers, employers and governments together to improve the conditions that people worked in.',1,1),(16,'Commission for Refugees','To return prisoners of war home and support refugees by improving camp conditions, finding new homes, or returning them to their own countries once the threat of conflict had passed.',1,1),(17,'Health Committee','To reduce disease worldwide.',1,1),(18,'Economic and Financial Committee','To find a solution to monetary problems and facilitate the circulation of goods and funds.',1,1),(19,'Permanent Central Opium Board','To stop the cultivation and distribution of opium.',1,1),(20,'Slavery Commission','Abolish slavery worldwide.',1,1),(21,'Organisation for Communications and Transport','Regulated transport developed during the war in order to keep people safe.',1,1),(22,'Aland Islands Crisis of 1921','Sweden and Finland claimed the Aland Islands and threatened war. The League investigated and said they should be given to Finland. It was a success as neither side declared war.',1,1),(23,'Vilna Crisis of 1920','Vilna was set to become the capital of the new state of Lithuania however people in the city identified as Polish. The Polish Army took the city and the League asked them to remove it. Poland refused. France refused to help as it was an ally of Poland and Britain would not intervene as no other country would support it. It was a failure as the League did nothing to stop Poland from going to war.',1,1),(24,'Bulgaria Crisis of 1925','Greek soldiers were killed on the Bulgarian border so Greece invaded Bulgaria. Bulgaria appealed to the League for help and the League condemned Greece and demanded that it withdraw its troops. Greece obeyed and it was therefore a success as war was prevented.',1,1),(25,'Corfu Crisis of 1923','An Italian General was visiting the island when he and his team were assassinated. Mussolini invaded Corfu as the League did nothing. Greece paid compensation. This was a failure as the League was undermined by other organisations.',1,1),(26,'Upper Silesia Crisis of 1921-25','Germany and Poland wanted to claim this area for their own. A plebiscite was enforced by Britain and France which was won by Germany. Poland complained and so the League split the industrial zones to Poland and the rural zones to Germany. Neither side was happy and this was not resolved by the League. Therefore, this was a failure as it exacerbated tensions between Germany and Poland.',1,1),(27,'Locarno Treaties (1925)','1. It invited many European countries, including Germany and the USSR into the League.\n2. France, Belgium and Germany promised not to invade each other.\n3. Many countries including Germany agreed to uphold the terms of the Treaty of Versailles.',1,1),(28,'Why were the Locarno Treaties successful?','1. They represented the peace process in Germany and how they now support the Treaty of Versailles\n2. It allowed Germany into the League, showing they wanted to be a peaceful country again.',1,1),(29,'Why were the Locarno Treaties a failure?','1. The League had nothing to do with the Treaties, showing that they were ignored by larger powers, undermining them.\n2. The peace agreement should have been enforced by the League of Nations across all of its members.',1,1),(30,'Kellogg-Briand Pact (1928)','65 countries including Germany, France and the USA signed a treaty to say that war was not a way of resolving international disputes. It seemed like a triumph of pacifism and common sense.',1,1),(31,'Why was the Kellogg-Briand Pact successful?','1. Furthered the League\'s aims to encourage global peace and disarmament.\n2. Improved relations between countries temporarily.',1,1),(32,'Why was the Kellogg-Briand Pact a failure?','1. The Pact took place outside of the League so it undermined the belief in collective security.\n2. No sanctions were introduced as a result of breaking the pact.',1,1),(33,'Why did Japan want Manchuria?','1. Natural resources\n2. Annoy the Russians\n3. Chinese government is weak\n4. Japanese industry is there\n5. Geographically close\n6. Kwantung army are there already\n7. Backing of the generals in government',1,1),(34,'Why did Mussolini want Abyssinia?','1. It would distract from the economic problems at home caused by the depression\n2. Provide cheap land for Italian settlers\n3. Connect various Italian colonies together',1,1),(35,'What was the cause for Mussolini starting his invasion?','There was a clash between Italian and Abyssinian troops near the Wal Wal oasis in December 1934. Mussolini blamed the Abyssinians. He invaded in October 1935.',1,1),(36,'Why didn\'t France and Britain punish Italy more harshly\n for the Abyssinian crisis?','They needed Italy\'s support against Hitler. Furthermore, they couldn\'t place economic sanctions due to the depression as it would cripple their own economies.',1,1),(37,'What was the Hoare-Laval pact?','A secret deal between Italy, France and Britain that would have given Mussolini most of Abyssinia in return for peace. It was leaked by the French press and the public in both countries were in uproar.',1,1),(38,'What could France and Britain have done to stop the Italian invasion?','They could have established an embargo on oil, needed for the war effort. They could also have closed the Suez canal, which Mussolini was transporting his troops through.',1,1),(39,'How did the Abyssinian crisis weaken the League?','1. The methods the British and French used showed that the League could be ignored, even by a permanent member.\n2. It weakened the diplomatic relations between Britain, France and Italy\n3. Let Hitler re militarise the Rhineland while nobody was paying attention\n4. Italy\'s isolation allowed Germany to extend its friendship, leaving the way clear for Anschluss.',1,1),(40,'The Ruhr valley invasion','When Germany couldn\'t pay its reparations, France and Belgium invaded to take the money from factories in the Ruhr valley. When they arrived, the workers were paid by the German government to go on strike, meaning the French couldn\'t take anything. The German government had to print money to achieve this and this led to hyperinflation a few years later.',1,1),(41,'September 1931','Japan claims Chinese soldiers sabotaged the Japanese railway in Manchuria. They subsequently invaded.',1,1),(42,'February 1932','Japan sets up puppet government in Manchuria which was led by Pu Yi who was easily controlled by the military. The province was renamed Manchukuo.',1,1),(43,'Later in 1932','Japan sent aeroplanes and gunships to bomb Shanghai. The Japanese government told the military to stop but it was ignored.',1,1),(44,'September 1932','The League published a report a year after the initial invasion that made clear the fact that Japan had acted unlawfully. It said Manchuria should be returned to the Chinese.',1,1),(45,'February 1933','Japan announces that it will invade more of China. On 24th of February the League\'s report is approved by 42 votes to 1. Only Japan voted against it.',1,1),(46,'27th March 1933','Japan resigns from the League of Nations. It invaded Jehol a week later.',1,1),(47,'Problems of tackling the situation','1. The US, Japan\'s biggest trading partner, was outside the League\n2. Large countries like the USSR weren\'t in the League so it would be difficult to mobilise troops\n3. Most of the members of the League were in Europe and they felt it wasn\'t their problem\n4. Japan was a permanent member of the council and could veto any proposal to stop the invasion of Manchuria',1,1),(48,'Why was the League reluctant to act?','1. Britain and France were suffering from the Depression\n2. Japan was powerful\n3. Europe wasn\'t concerned\n4. League didn\'t want a big war\n5. Sanctions didn\'t work\n6. Japan owned much of Manchuria anyway\n7. USSR couldn\'t help',1,1),(49,'League of Nations','A vision of a world parliament where all the countries in the world discuss the world\'s issues.',1,2),(50,'Collective security','Where several countries work together so they can strengthen each other\'s security.',1,2),(51,'Permanent Court of International Justice','Where several countries work together so they can strengthen their security by discussion.',1,2),(52,'Mitigation','Where two or more countries have a disagreement and the case was brought before the whole of the League of Nations so that it could be resolved through discussion.',1,2),(53,'Moral condemnation','Where several countries would issue warnings to a country that had broken the Covenant of the League of Nations.',1,2),(54,'Economic sanctions','These sanctions were the last resort for the League when a country had broken one of the rules of the Covenant. It usually consisted of trade tariffs and restrictions and was made effective by the number of countries in the League.',1,2),(55,'What were the aims of the League of Nations?','1. To stop war\n2. Encourage disarmament\n3. Improve working conditions\n4. Reduce disease',1,2),(56,'Fontainebleau Memorandum','A document written by David Lloyd George during the Paris Peace Conference that declared his support behind the idea of the League of Nations.',1,2),(57,'The Assembly','Every member sent representatives to the Assembly and decisions had to be unanimous. If it wasn\'t, the decision was sent to the council. It was a world parliament.',1,2),(58,'The Council','The council met more frequently than the Assembly and could respond more quickly. They had a veto on any decision made by the assembly and elected non-permanent members every three years.',1,2),(59,'Secretariat','The civil service of the League of Nations. They did all the administrative work.',1,2),(60,'Agencies and special commissions','Special groups were put together to tackle issues of concern.',1,2),(61,'Structural strengths of the League of Nations','1. It had vast membership which made punishments like moral condemnation and economic sanctions more effective.\n2. The council was able to make some quick decisions\n3. Victorious nations had agreed and recognised its creation - suggesting that it had international respect.',1,2),(62,'Structural weaknesses of the League of Nations','1. The League had no army, that meant it could not force people to obey it. Therefore, its power was limited.\n2. Not all countries had equal rights and this caused tension\n3. The structure was very complicated and confused people. It also slowed down proceedings.',1,2),(63,'International Labour Organisation','To bring workers, employers and governments together to improve the conditions that people worked in.',1,2),(64,'Commission for Refugees','To return prisoners of war home and support refugees by improving camp conditions, finding new homes, or returning them to their own countries once the threat of conflict had passed.',1,2),(65,'Health Committee','To reduce disease worldwide.',1,2),(66,'Economic and Financial Committee','To find a solution to monetary problems and facilitate the circulation of goods and funds.',1,2),(67,'Permanent Central Opium Board','To stop the cultivation and distribution of opium.',1,2),(68,'Slavery Commission','Abolish slavery worldwide.',1,2),(69,'Organisation for Communications and Transport','Regulated transport developed during the war in order to keep people safe.',1,2),(70,'Aland Islands Crisis of 1921','Sweden and Finland claimed the Aland Islands and threatened war. The League investigated and said they should be given to Finland. It was a success as neither side declared war.',1,2),(71,'Vilna Crisis of 1920','Vilna was set to become the capital of the new state of Lithuania however people in the city identified as Polish. The Polish Army took the city and the League asked them to remove it. Poland refused. France refused to help as it was an ally of Poland and Britain would not intervene as no other country would support it. It was a failure as the League did nothing to stop Poland from going to war.',1,2),(72,'Bulgaria Crisis of 1925','Greek soldiers were killed on the Bulgarian border so Greece invaded Bulgaria. Bulgaria appealed to the League for help and the League condemned Greece and demanded that it withdraw its troops. Greece obeyed and it was therefore a success as war was prevented.',1,2),(73,'Corfu Crisis of 1923','An Italian General was visiting the island when he and his team were assassinated. Mussolini invaded Corfu as the League did nothing. Greece paid compensation. This was a failure as the League was undermined by other organisations.',1,2),(74,'Upper Silesia Crisis of 1921-25','Germany and Poland wanted to claim this area for their own. A plebiscite was enforced by Britain and France which was won by Germany. Poland complained and so the League split the industrial zones to Poland and the rural zones to Germany. Neither side was happy and this was not resolved by the League. Therefore, this was a failure as it exacerbated tensions between Germany and Poland.',1,2),(75,'Locarno Treaties (1925)','1. It invited many European countries, including Germany and the USSR into the League.\n2. France, Belgium and Germany promised not to invade each other.\n3. Many countries including Germany agreed to uphold the terms of the Treaty of Versailles.',1,2),(76,'Why were the Locarno Treaties successful?','1. They represented the peace process in Germany and how they now support the Treaty of Versailles\n2. It allowed Germany into the League, showing they wanted to be a peaceful country again.',1,2),(77,'Why were the Locarno Treaties a failure?','1. The League had nothing to do with the Treaties, showing that they were ignored by larger powers, undermining them.\n2. The peace agreement should have been enforced by the League of Nations across all of its members.',1,2),(78,'Kellogg-Briand Pact (1928)','65 countries including Germany, France and the USA signed a treaty to say that war was not a way of resolving international disputes. It seemed like a triumph of pacifism and common sense.',1,2),(79,'Why was the Kellogg-Briand Pact successful?','1. Furthered the League\'s aims to encourage global peace and disarmament.\n2. Improved relations between countries temporarily.',1,2),(80,'Why was the Kellogg-Briand Pact a failure?','1. The Pact took place outside of the League so it undermined the belief in collective security.\n2. No sanctions were introduced as a result of breaking the pact.',1,2),(81,'Why did Japan want Manchuria?','1. Natural resources\n2. Annoy the Russians\n3. Chinese government is weak\n4. Japanese industry is there\n5. Geographically close\n6. Kwantung army are there already\n7. Backing of the generals in government',1,2),(82,'Why did Mussolini want Abyssinia?','1. It would distract from the economic problems at home caused by the depression\n2. Provide cheap land for Italian settlers\n3. Connect various Italian colonies together',1,2),(83,'What was the cause for Mussolini starting his invasion?','There was a clash between Italian and Abyssinian troops near the Wal Wal oasis in December 1934. Mussolini blamed the Abyssinians. He invaded in October 1935.',1,2),(84,'Why didn\'t France and Britain punish Italy more harshly\n for the Abyssinian crisis?','They needed Italy\'s support against Hitler. Furthermore, they couldn\'t place economic sanctions due to the depression as it would cripple their own economies.',1,2),(85,'What was the Hoare-Laval pact?','A secret deal between Italy, France and Britain that would have given Mussolini most of Abyssinia in return for peace. It was leaked by the French press and the public in both countries were in uproar.',1,2),(86,'What could France and Britain have done to stop the Italian invasion?','They could have established an embargo on oil, needed for the war effort. They could also have closed the Suez canal, which Mussolini was transporting his troops through.',1,2),(87,'How did the Abyssinian crisis weaken the League?','1. The methods the British and French used showed that the League could be ignored, even by a permanent member.\n2. It weakened the diplomatic relations between Britain, France and Italy\n3. Let Hitler re militarise the Rhineland while nobody was paying attention\n4. Italy\'s isolation allowed Germany to extend its friendship, leaving the way clear for Anschluss.',1,2),(88,'The Ruhr valley invasion','When Germany couldn\'t pay its reparations, France and Belgium invaded to take the money from factories in the Ruhr valley. When they arrived, the workers were paid by the German government to go on strike, meaning the French couldn\'t take anything. The German government had to print money to achieve this and this led to hyperinflation a few years later.',1,2),(89,'September 1931','Japan claims Chinese soldiers sabotaged the Japanese railway in Manchuria. They subsequently invaded.',1,2),(90,'February 1932','Japan sets up puppet government in Manchuria which was led by Pu Yi who was easily controlled by the military. The province was renamed Manchukuo.',1,2),(91,'Later in 1932','Japan sent aeroplanes and gunships to bomb Shanghai. The Japanese government told the military to stop but it was ignored.',1,2),(92,'September 1932','The League published a report a year after the initial invasion that made clear the fact that Japan had acted unlawfully. It said Manchuria should be returned to the Chinese.',1,2),(93,'February 1933','Japan announces that it will invade more of China. On 24th of February the League\'s report is approved by 42 votes to 1. Only Japan voted against it.',1,2),(94,'27th March 1933','Japan resigns from the League of Nations. It invaded Jehol a week later.',1,2),(95,'Problems of tackling the situation','1. The US, Japan\'s biggest trading partner, was outside the League\n2. Large countries like the USSR weren\'t in the League so it would be difficult to mobilise troops\n3. Most of the members of the League were in Europe and they felt it wasn\'t their problem\n4. Japan was a permanent member of the council and could veto any proposal to stop the invasion of Manchuria',1,2),(96,'Why was the League reluctant to act?','1. Britain and France were suffering from the Depression\n2. Japan was powerful\n3. Europe wasn\'t concerned\n4. League didn\'t want a big war\n5. Sanctions didn\'t work\n6. Japan owned much of Manchuria anyway\n7. USSR couldn\'t help',1,2);
/*!40000 ALTER TABLE `flash_cards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_sets`
--

DROP TABLE IF EXISTS `study_sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_sets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_sets`
--

LOCK TABLES `study_sets` WRITE;
/*!40000 ALTER TABLE `study_sets` DISABLE KEYS */;
INSERT INTO `study_sets` VALUES (1,'The League of Nations','Useful text describing the contents of this study set. This study set will help you improve your skills in whatever subject it may concern. This is placeholder text for styling purposes.',1),(2,'The League of Nations','Useful text describing the contents of this study set. This study set will help you improve your skills in whatever subject it may concern. This is placeholder text for styling purposes.',1);
/*!40000 ALTER TABLE `study_sets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `set_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(60) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-17  8:35:46
