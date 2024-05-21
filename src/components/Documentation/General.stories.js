/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
import React from 'react';

import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';

import testReadme from './README.md';

export default {
  title: 'Documentation/General',
  parameters: {
    options: {
      selectedPanel: false,
      showPanel: false,
      showNav: true,
      isToolshown: false
    },
    readme: {
      sidebar: testReadme,
    },
  }
};

export const Intro = () => (
  <Container wrap className="p--x-big">
    <Heading>
      Welcome to
      {' '}
      <strong>atomik</strong>
    </Heading>
    <Paragraph>
      Exemple of order to write an class:
      <pre>
        <code>
          {' className={`name-class ${className} ${condition ? a : b} ${handleCreateStyleClass(props)} other-class1 other-class2`} '}
        </code>
      </pre>
    </Paragraph>
  </Container>
);

export const Colors = () => (

  <pre>
    <code>
      {`
      - O componente é um átomo, quando só possui um elemento, somente 1 item, um componente
      - O componente é uma molécula, quando possui, 2 ou mais componentes
      - O componente é um organismo, quando possui 2 ou mais moléculas, pode ter vários átomos também


      - Falar do padrão de cores
      . Pode ser por var js:
        ex.:  main.800, gray-cold.500 => color="main.800" textColor="grey-cold.500"
        a escala das cores vai de 50... 100 a 800
        fazendo relação ao objeto java script (theme.lmem.customColors.red.800)
        !!! IMPORTANTE a cor 'main' e 'secundary' não existem, elas são definidas dinamicamente por script. Cada tema/theme tem uma cor ‘main’ e uma cor ‘secundary’ diferente.

      . Dentro dos estilos precisamos usar cor hexadecimal (#00080)
        mas como as cores estão em um objeto, fizemos uma função de atalho, para retornar a cor ==> getColor('red.800') ao invés de utilizar (theme.lmem.customColors.red.800)

      . Por classe:
        bc--main-800, bc--gray-cold-500, c--main-800, c--gray-cold-500
        background-color = bc--
        color = c--
        estilos utilizam o padrão BEM [propriedade]--[cor]-[variação] => c--main-800

      - Usar sempre o BEM para estilos e imagens
        artigos de referência https://seesparkbox.com/foundry/bem_by_example e http://getbem.com/naming/ e https://www.smashingmagazine.com/2018/06/bem-for-beginners/
      - Usar sempre camelCase para js (arquivos, funções, classes, constantes, variáveis, etc)

      - BEM também deverá ser utilizado para criação de estilos.
        ex.: box-bibliography --> box-bibliography__list --> bibliography__item --> bibliography__link --> --> bibliography__link--active --> bibliography__icon

        Deve-se haver coerência na profundidade do nome. A partir de certo nível de profundidade dos elementos, já se entende de qual elemento estamos falando,
        sem a necessidade de criar nomes gigantes.
        ex.: box-bibliography__list__item__link--active --> bibliography__link--active
        É ÓBVIO, que se o link está dentro de 'bibliography', ele está dentro de um 'item/li' que por sua vez está dentro da 'lista/ul'
        Não há a necessidade de repetir tudo.

        IMPORTANTE: não usar estilos aninhados
        box-bibliography ul li a .icon(errado)
        box-bibliography ul li a.--active(errado)
        bibliography__link li a(errado)
        bibliography__list (certo)
        bibliography__item (certo)
        bibliography__link (certo)

        Poucas são as exceções, como na Single.js, pois o conteúdo virá dinâmico, provavelmente de um editor Wordpress.
        Então podemos usar:
        .article-content  h1
        .article-content  p
        Pois os conteúdos podem vir diferentes do publicador, e não é prático colocar os estilos nos textos, títulos lá no publicador.

      - Explicar quando usar resolve, local, e global
        <style jsx> -> local, somente no escopo do componente
        <style jsx global> -> em todos os escopos, de todos os componentes
        css.resolve -> usado bastante nas 'moléculas', para passar um estilo a um outro componente (outro escopo)

      - Justificar porque está usando css global
        SEMPRE, pensar se não pode ser utilizado <style jsx> e css.resolve, pois o <style jsx global>, pode gerar problemas de cascateamento,
        sendo necessário tratar exceções, a afetar estilos dentro de componentes.
        Se precisar utilizar, utilize com RESPONSABILIDADE, e para modificar um estilo novo, e não o e não o original do componente.
        ex.: como na Single.js
        <Col colSize="fixed" className="column__aside">
        (Certo)
        .column__aside{
        width:301px;
        }
        (Errado)
        .column{
        width:301px;
        }
        (Errado)
        .column--fixed{
        width:301px;
        }

      - na pasta _settings é possível encontrar os principais arquivos que controlam o visual do site
        .GlobalStyles: estilos e classes helpers utilizadas em todo o projeto
        _animations.js: para animações (fade..)
        _colors.js: para todas as cores (c-- e bc--)
        _helpers.js: para a maioria das classes (display -> d--, position -> p--, border -> b--, zindex -> zi-- )
        _spacing.js: espacamentos paddings e margins
        _text.js: tudo relacionado a texto (line-height, font-size, font-family, font-weight)
        .ThemeProvider: configuração do tema, com todas as propriedades e configurações utilizadas nos componentes e classes helpers
        .UTILS: São arquivos com funções úteis, funções que se repetem nos componentes e páginas.
        ex.: createStyleClass...isBrowser...stringToSlug...throttle
        .HOOKS: São arquivos com funções úteis, funções que se repetem nos componentes e páginas, mas pela sua singularidade, são classificadas como HOOKS pelo React

      - Ordem correta de inserir os estilos nos componentes
      [nome da classe mãe] [className styled.jsx resolve] [ifs] [handleCreateStyleClass se necessário] [todo o resto]
      ex. className={box-author $className $divider ? 'a' : 'b' $handleCreateStyleClass(props) p--0 lh--1-5 d--flex ai--center}}

      - Dúvidas PESQUISE no storybook ou faça uma busca no repositório de projeto, se ainda assim houverem dúvidas PERGUNTE, não faça cagada!!!
      - Contamos com sua colaboração, pra criar classes e arquivos no padrão correto, facilitando o entendimento de toda a equipe (atuais e novos)
      `}
    </code>
  </pre>

);
