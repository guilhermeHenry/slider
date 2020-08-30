<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="../../oocss/style.min.css">	
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<?php
		$factory = require '../src/factory/factory.php';
	?>
<div id="insertSlider">
	<div class="slider">

		<!-- CONTENT -->
		<div class="slider-container">
			<div class="slider-box">
				<div class="slider-item 1">
				<?php
				$i = 1;
				foreach ($factory as $value):
					extract($value);
				?>

				<article>
					<hr style="
						--bg: url('<?= '../' . $background['path'] . '/' . $background['img'] ?>'); 
						--bg-x: <?= $background['x'] ?>; 
						--bg-y: <?= $background['y'] ?>;">
					<a href="<?= $href ?>">
						<header>
							<strong class="phrase"><?= $phrase?></strong>
							<p class="subtitle"><?= $title ?></p>
						</header>
					</a>
				</article>

				<?php 
					if ($i % 3 === 0){
						echo '</div>
							<div class="slider-item ' . ($i % 3 === 0 ? $i / 3 + 1  : '') . '">';
					} 
					$i++; 
					endforeach; 
				?>
				</div>
			</div>
		</div>

		<!-- ARROWS -->
		<div class="slider-arrows">
			<hr class="left">
			<hr class="right">
		</div>
		
		<!-- PAGINATOR -->
		<div class="slider-paginator"></div>
	</div>
</div>
<script src="app.js"></script>
</body>
</html>