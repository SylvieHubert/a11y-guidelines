# Declaring the main language and language changes 

<script>$(document).ready(function () {
    setBreadcrumb([
        {"label":"WCAG criteria by project phase - Developers", "url": "./incontournables.html#dev"},
        {"label":"Declaring the main language and language changes "}
    ]);
});</script>

<span data-menuitem="incontournables"></span>
**Target: **everyone, particularly people with visual impairments.  
**When: **during development.

**Description: ** 

Specify the primary language of the document with the attribute `lang` in the `html` tag.
Also specify the language of a content in a language other than the primary one, using the `lang` attribute in the <abbr>HTML</abbr> element containing the foreign language text.  

**Checklist: **

For words or phrases in foreign language used as generic terms (déjà vu, chef d'œuvre …) or proper names, do not indicate a change of language.

**Users’ goal: **

This attribute allows you to specify the language to the speech synthesis.

**Technical goal: **

Enable search engines to identify the language of a page to improve the natural referencing.  

**Example for a page in French:** 

- using <abbr>HTML</abbr>: `<html lang="fr">`
- using XHTML: `<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">`

**Example of language change: ** 
`découvrir Orange <span lang="en">live</span> TV`

**Reference <abbr>WCAG</abbr>&nbsp;:**  
- <a href="https://www.w3.org/TR/WCAG21/#language-of-page">3.1.1 Language of Page</a>
- <a href="https://www.w3.org/TR/WCAG21/#language-of-parts">3.1.2 Language of Parts</a>

<!--  This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
 Copyright (C) 2016  Orange SA
 See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file). -->