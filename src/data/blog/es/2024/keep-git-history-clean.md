---
author: Luismi Barcos
pubDatetime: 2024-11-28
title: "GitTricks: How to keep your history clean"
description: "Este post explica como mantener un historial de Git limpio."
featured: true
tags:
  - git
  - software development
---

# GitTricks: How to keep your history clean

> **Disclaimer**  
> Este artículo lo escribí originalmente para el [Blog de Celonis](https://careers.celonis.com/blog/keep-git-history-clean).  
> El contenido es propiedad de **Celonis SE**.  
> Lo publico aquí como parte de mi blog personal.

Los commits de Git son fundamentales para cualquier repositorio. Cada commit representa una instantánea de los cambios en tu proyecto y, idealmente, viene acompañado de un mensaje que explica la naturaleza de esos cambios.

A medida que los proyectos evolucionan —ya sea mediante la adición de funcionalidades, la eliminación de otras, la corrección de errores, etc.— estos cambios se registran en commits. Pero sin una gestión adecuada, el historial puede volverse caótico, dificultando el seguimiento de la evolución del proyecto.

En este post, veremos algunos trucos para ayudarte a mantener un log de Git limpio y legible, que beneficie tanto a ti como a tu equipo.

## ¿Por qué debería importarme el historial de Git?

¿Alguna vez has visto un historial de Git como este?

![Messy History](@/assets/images/2023/keep-git-history-clean/messy-history.png "Messy History")

Este log no dice mucho sobre los cambios realizados. Se pueden ver los experimentos del desarrollador, errores encontrados y corregidos en el camino, y mensajes de commit poco descriptivos. Ahora, imagina revisar un PR con estos commits, es más difícil de lo que debería ser.

Además, piensa en una situación en la que estás investigando un bug y revisas el historial de commits. Este historial está lleno de "ruido", lo que dificulta identificar los cambios relevantes.

Cuando desarrollamos, es normal experimentar —quizás estamos probando una nueva librería o explorando diferentes enfoques para resolver un problema— pero nuestros vaivenes durante el desarrollo no necesitan permanecer en el historial del proyecto, ¿verdad?

La primera parte para limpiar el historial es limpiar tus ramas, pero ¿qué pasa cuando mezclas tus cambios con los de tus compañeros?

## Problemas al hacer merge: History Caos

Cuando trabajas en equipo, a menudo necesitas incorporar cambios de tus compañeros. La forma más simple de hacerlo es hacer un merge de su rama con la tuya. Sin embargo, el merge tiene desventajas:

- Crea "commits de merge" adicionales que ensucian tu rama con commits que a menudo no tienen contenido significativo.
- Mezcla tu historial con el de tus compañeros, dificultando el seguimiento de tus propios cambios.

¿Cuántas veces has visto un log de Git como este?

![History Caos](@/assets/images/2023/keep-git-history-clean/history-caos.png "History Caos")

Incluso en un proyecto pequeño con solo unos cuantos commits, es difícil saber cuándo y qué se ha añadido a la rama principal.

Además, en este ejemplo, hay 6 commits de merge de un total de 23, lo que significa que **el 26% de los commits son merges.**

Si tienes curiosidad por saber el porcentaje de commits de merge en una de tus ramas, puedes usar el siguiente comando:

```
git log <your branch> --pretty=%P | awk '{if(NF>1) merge++} END {print merge/NR*100 "%"}'
```

## ¿Cómo lograr un historial más limpio?

_Disclaimer: Los trucos que exploraremos implican modificar el historial de Git. Esto puede ser peligroso si otras personas están trabajando en la misma rama, así que evita hacerlo en ramas compartidas como `main` o `develop`. Muchas plataformas, como GitHub o Bitbucket, ofrecen protección de ramas para evitar cambios accidentales en el historial._

### Rebase

Rebase es una forma de integrar cambios de una rama en otra sin crear commits de merge. En lugar de hacer merge, un rebase reescribe el historial de tu rama colocando tus commits encima de los commits de la otra rama.

![Before Rebase](@/assets/images/2023/keep-git-history-clean/before-rebase.png "Before Rebase")

![After Rebase](@/assets/images/2023/keep-git-history-clean/after-rebase.png "After Rebase")

En las imágenes anteriores, puedes ver que estamos haciendo rebase de la rama `experiment` sobre la rama `master`.

Esta operación funciona buscando el ancestro común de las dos ramas, obteniendo el diff introducido por cada commit de la rama en la que estás, guardando esos diffs en archivos temporales, reseteando tu rama al commit de la rama destino, y aplicando cada cambio uno por uno (consulta la [documentación oficial](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) para más detalles).

Veamos un ejemplo.

![Rebase example 1](@/assets/images/2023/keep-git-history-clean/rebase-example-1.png "Rebase example 1")

Estás desarrollando una nueva funcionalidad en tu rama llamada “feature-7”, pero en medio del desarrollo se ha añadido un nuevo commit a la rama `main`. Es una situación común en equipos.

Para mantener el historial limpio, quieres poner tus cambios por delante de los últimos cambios de `main`, así que vamos a **rebasear tus cambios.**

Primero, obtén los últimos cambios de la rama `main`:

```
git pull origin main --ff-only
```

Ahora cambia a tu rama:

```
git checkout feature-7
```

Y haz rebase con la rama `main`:

```
git rebase main
```

![Rebase example 2](@/assets/images/2023/keep-git-history-clean/rebase-example-2.png "Rebase example 2")

Ahora tus cambios están por delante de los de `main`:

![Rebase example 3](@/assets/images/2023/keep-git-history-clean/rebase-example-3.png "Rebase example 3")

Ahora puedes fusionar tus cambios a `main` usando un merge fast-forward, evitando el commit de merge.

```
git checkout main
git merge feature-7 --ff-only
```

Tu historial de Git se verá así:

![Rebase example 4](@/assets/images/2023/keep-git-history-clean/rebase-example-4.png "Rebase example 4")

Sin commits de merge, sin commits mezclados, y el orden refleja el flujo real de desarrollo.

### Manejo de conflictos

Al igual que en un merge, el rebase puede generar conflictos. Cuando esto ocurre, Git detiene el rebase en el commit que causa el conflicto.

Puedes resolver los conflictos como normalmente lo haces y luego continuar con el rebase usando:

```
git rebase --continue
```

En caso de que quieras abortar el rebase:

```
git rebase --abort
```

## Rebase en repositorios remotos

La mayoría trabajamos enviando PRs a repositorios remotos. Plataformas como GitHub y Bitbucket ofrecen la opción de rebasear los cambios del PR sobre la rama destino. Veamos el ejemplo anterior enviando nuestra rama “feature-7” mediante un PR:

Recuerda, tenemos nuestra rama “feature-7” rebaseada sobre `main`.

![Previous git history](@/assets/images/2023/keep-git-history-clean/rebase-example-3.png "Previous git history")

Ahora creamos un PR y podemos ver las opciones que ofrece GitHub:

![Github Rebase](@/assets/images/2023/keep-git-history-clean/github-rebase.png "Github Rebase")

Si elegimos “Rebase and merge”, nuestros commits quedarán por delante de los de `main`. Es algo que ya hicimos localmente, pero durante el proceso de merge (revisiones, builds, etc.) podrían añadirse nuevos commits a la rama principal.

Si elegimos la opción de rebase, se producirá el mismo resultado que cuando hicimos el rebase local.

![GitHub History](@/assets/images/2023/keep-git-history-clean/github-history.png "GitHub History")

![GitHub Rebase Local.png](@/assets/images/2023/keep-git-history-clean/github-rebase-local.png)

Sin commits de merge, sin mezcla de commits, y el orden representa el orden real en que los cambios se han integrado a la rama principal.

_NOTA: es posible configurar el rebase como mecanismo por defecto en plataformas como GitHub._

## Rebase interactivo

El rebase interactivo es una herramienta poderosa que permite combinar commits, editarlos, reescribir mensajes o incluso eliminarlos.

Para ejecutar un rebase interactivo, puedes hacer:

`git rebase -i <hash-del-commit>`

o

`git rebase -i HEAD~X`

Donde `X` es el número de commits.

Git también proporciona una interfaz bastante explicativa cuando haces un rebase:

![Interactive Rebase Info](@/assets/images/2023/keep-git-history-clean/interactive-rebase-info.png "Interactive Rebase Info")

Volvamos al primer historial desordenado:

![Messy History](@/assets/images/2023/keep-git-history-clean/messy-history.png "Messy History")

Tenemos una rama terminada con todos nuestros experimentos y fallos. Para facilitar nuestra vida futura, vamos a reorganizar el historial. ¡Vamos allá!

Primero, vamos a combinar algunos commits de “fix” con sus commits originales. Entonces:

```
git rebase -i HEAD~6
```

![Interactive Rebase Example 1](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-1.png "Interactive Rebase Example 1")

Usamos la opción “f” para hacer squash del commit en el anterior, manteniendo el mensaje anterior. Este es nuestro estado actual:

![Interactive Rebase Example 2](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-2.png "Interactive Rebase Example 2")

Observa cómo los hashes han cambiado.

Siguiente paso, eliminamos el commit de revert porque nunca debimos hacer ese cambio:

```
git rebase -i HEAD~5
```

![Interactive Rebase Example 3](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-3.png "Interactive Rebase Example 3")

Nota que simplemente eliminamos los commits. Esto da como resultado:

![Interactive Rebase Example 4](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-4.png "Interactive Rebase Example 4")

Ahora, los mensajes de los commits no explican claramente lo que hicimos. Vamos a reescribirlos:

```
git rebase -i HEAD~3
```

![Interactive Rebase Example 5](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-5.png "Interactive Rebase Example 5")

Usamos la opción “r” para reescribir el mensaje del commit. Esto abrirá el editor por defecto:

![Interactive Rebase Example 6](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-6.png "Interactive Rebase Example 6")

Cambiamos el mensaje por lo que queramos. Este es el resultado final:

![Interactive Rebase Example 7](@/assets/images/2023/keep-git-history-clean/interactive-rebase-example-7.png "Interactive Rebase Example 7")

Ahora nuestra rama está más limpia y puede ser usada para enviar un PR (después de rebasear los cambios con el repositorio remoto).

## Conclusión

Mantener tu historial de Git limpio es esencial para tener un repositorio legible y mantenible. Usando los trucos anteriores lograrás:

- Ayudar a tu equipo (y revisores) a entender los pasos que tomaste durante el desarrollo, evitando la contaminación del historial con experimentos fallidos.
- Mantener un orden lógico de commits, útil para el mantenimiento futuro.
- Simplificar la búsqueda de bugs y facilitar los rollbacks.

¡Usa estas técnicas con sabiduría, especialmente en ramas compartidas, para mantener un historial de Git limpio y manejable!
