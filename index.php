<?php
require __DIR__ . '/load.php';

Route::run('/', 'main@index');

Route::run('/courses', 'course@list');
Route::run('/course/edit/{id}', 'course@edit');
Route::run('/course/new', 'course@new');
Route::run('/api/courses', 'course@all', 'get');
Route::run('/api/courses/{id}', 'course@paged', 'get'); /* {id}=> page number */
Route::run('/api/course/{id}', 'course@single', 'get');
Route::run('/api/course/{id}', 'course@update', 'put');
Route::run('/api/course/{id}', 'course@delete', 'delete');
Route::run('/api/course', 'course@insert', 'post');

Route::run('/students', 'student@list');
Route::run('/student/edit/{id}', 'student@edit');
Route::run('/student/new', 'student@new');
Route::run('/api/students', 'student@all', 'get');
Route::run('/api/students/{id}', 'student@paged', 'get');
Route::run('/api/student/{id}', 'student@single', 'get');
Route::run('/api/student/{id}', 'student@update', 'put');
Route::run('/api/student/{id}', 'student@delete', 'delete');
Route::run('/api/student', 'student@insert', 'post');

Route::run('/classrooms', 'classroom@list');
Route::run('/classroom/edit/{id}', 'classroom@edit');
Route::run('/classroom/new', 'classroom@new');
Route::run('/api/classrooms', 'classroom@all', 'get');
Route::run('/api/classrooms/{id}', 'classroom@paged', 'get');
Route::run('/api/classroom/{id}', 'classroom@single', 'get');
Route::run('/api/classroom/{id}', 'classroom@update', 'put');
Route::run('/api/classroom/{id}', 'classroom@delete', 'delete');
Route::run('/api/classroom', 'classroom@insert', 'post');
