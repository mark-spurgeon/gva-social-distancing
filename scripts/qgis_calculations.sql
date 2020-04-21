/**
 * This is just a file to copy/paste expressions to QGIS.
 */
 
/* Commerce type */
case
  when lower(NOM) like 'm-%' then 'nourriture'
  when lower(NOM) like 'mm-%' then 'nourriture'
  when lower(NOM) like 'mmm-%' then 'nourriture'
	when lower(NOM) like 'coop%' then 'nourriture'
	when lower(NOM) like 'denner%' then 'nourriture'
	when lower(NOM) like 'lidl%' then 'nourriture'
	when lower(NOM) like 'aldi%' then 'nourriture'

	
  when lower(NOM) like '%voi migros%' then 'nourriture'

	when lower(NOM) like '%pharma%' then 'pharmacie'
	when lower(NOM) like '%amavita%' then 'pharmacie'
	
  /* Exceptions */
	else 'autre'
end


/* Intervention type */
case
  when lower(OBJET) like 'chausée%' then 'no'
  when lower(OBJET) like 'site propre%' then 'no'
  when lower(OBJET) like '%espace de stationnement%' then 'parking'
  when lower(OBJET) like 'parking%' then 'parking'
  when lower(OBJET) like 'piste cyclable%' then 'velo'
  else 'no'
end


/* Needed places per shops */
case
  when lower(BRANCHE) like 'grands supermarchés%' then 35
  when lower(BRANCHE) like 'grands commerces%' then 30
  when lower(BRANCHE) like 'grands magasins%' then 30
  when lower(BRANCHE) like 'petits supermarchés%' then 15
  when lower(BRANCHE) like 'commerce de détail%' then 10
  when lower(BRANCHE) like 'petits commerces%' then 6
  when lower(BRANCHE) like '%traiteurs%' then 6
  when lower(BRANCHE) like 'bars%' then 4
  when lower(BRANCHE) like 'boulangeries%' then 4
  when lower(BRANCHE) like 'restaurants%' then 4

  when lower(BRANCHE) like 'fabrication%' then 0
  when lower(BRANCHE) like 'gestion%' then 0
  when lower(BRANCHE) like 'transport%' then 0
  else 1
end