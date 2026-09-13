---
slug: a-workflow-can-run-green-and-still-do-nothing
locale: nl
title: "Een workflow kan elke dag groen draaien en toch niets doen"
description: "De meeste automatisering faalt niet luid. Ze rapporteert succes terwijl ze niets bruikbaars schrijft. Dit is wat je een leverancier moet vragen voordat je die inhuurt."
publishedAt: 2026-08-08
author: "Joey Tan"
collection: reliability
tags: ["operations", "automation", "buying guide"]
---

Een workflow draait elke ochtend om zeven uur. De uitvoeringsgeschiedenis is
groen. Geen mislukte stappen, geen meldingen, niets in het foutenlog. Dat is
al weken zo.

De records die hij aanmaakt zijn leeg. Een veldnaam is veranderd in de tool
aan de andere kant, de koppeling matcht niet meer, en de workflow deed
precies wat hem was opgedragen. Hij draaide. Hij schreef. Hij rapporteerde
succes.

Niets daarvan is een fout, dus is er ook niets als fout gemeld.

## Waarom is dit de normale mislukking, en niet de uitzondering?

Omdat automatisering gebouwd is om te voltooien, niet om correct te zijn. Een
stap mislukt als hij niet kan afronden: de API ligt eruit, de inloggegevens
zijn verlopen, het bestand ontbreekt. Dat is luid, en elke leverancier
ondervangt het. Opnieuw proberen, loggen, een melding in Slack.

De dure mislukkingen ronden wél af. Iets stroomopwaarts verandert van vorm,
de workflow blijft draaien tegen die nieuwe vorm aan, en de uitkomst is fout
op een manier waar het systeem geen mening over heeft. Groene run, leeg
resultaat.

Luide mislukkingen worden dezelfde week nog opgelost. Stille lopen door tot
iemand verderop toevallig even kijkt.

## Wat moet ik een automatiseringsleverancier vragen?

De meeste koopgidsen zeggen je te vragen hoe een leverancier met fouten
omgaat. Elke leverancier heeft een antwoord, meestal de naam van een functie.
Dat dekt het geval waarin iets vastloopt.

Vraag in plaats daarvan dit:

> Hoe zou dit systeem mij vertellen dat het was gestopt met zijn werk, in een
> week waarin niets fout liep?

Een leverancier die zijn eigen bouwwerk al een tijd in productie heeft
draaien, herkent de vraag meteen. Iemand die vooral gedemonstreerd heeft,
antwoordt weer met monitoringfuncties.

## Hoe klinkt een goed antwoord?

Grofweg drie dingen.

**Een controle die de workflow niet zelf kan afvinken.** Als de workflow
zowel het werk doet als het werk bevestigt, corrigeert hij zijn eigen
huiswerk. De bevestiging moet komen van een systeem dat hij niet beheert:
het aantal in de bron, niet het aantal dat hij zelf schreef. Dat is
[dezelfde vorm als een factuur die perfect optelt en toch fout
is](/learn/an-invoice-can-be-perfect-and-still-be-wrong/).

**Een melding bij afwezigheid, niet alleen bij falen.** De meeste meldingen
gaan af als er iets misgaat. De nuttigere gaat af als iets dat had moeten
gebeuren, niet is gebeurd: geen bestellingen verwerkt vandaag, terwijl er
altijd bestellingen zijn. Stilte is het symptoom dat je probeert te vangen,
dus stilte moet iets zijn wat het systeem kan opmerken.

**Een benoemd getal waar iemand daadwerkelijk naar kijkt.** Wekelijks, op
iemands agenda.

Dan nog één vraag, die je meer vertelt dan de rest samen: wat ging er stuk
bij jullie laatste bouwproject, en hoe kwamen jullie erachter? Als het
antwoord is dat er niets kapot is gegaan, hebben ze óf niet veel opgeleverd,
óf ze kijken niet goed.

## Heb ik überhaupt een leverancier nodig?

Als het werk één koppeling is tussen twee tools die allebei een eigen
integratie voor elkaar aanbieden, koop dan de integratie. Vijftig euro per
maand en een middagje wint het van een project, en elke leverancier die iets
anders beweert, verkoopt je een project.

Iemand erbij halen verdient zichzelf terug zodra het werk meerdere systemen
doorkruist en iemand moet bepalen wat er als correct geldt. Die beslissing
is het eigenlijke werk. Het verbinden is het makkelijke deel, en dat wordt
elk jaar makkelijker.

## De twee vragen

Hoe zou dit systeem mij vertellen dat het was gestopt met zijn werk, in een
week waarin niets fout liep? En wat ging er stuk bij jullie laatste
bouwproject, en hoe kwamen jullie erachter?

Wil je een second opinion over iets wat je op het punt staat uit te
besteden? Daar is het startgesprek voor. Twintig minuten, geen
verkooppraatje.
